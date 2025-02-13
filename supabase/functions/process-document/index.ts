
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const sessionId = formData.get('sessionId')

    if (!file || !sessionId) {
      throw new Error('File and session ID are required')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const fileExt = file.name.split('.').pop()?.toLowerCase()
    const allowedTypes = ['pdf', 'docx', 'txt']
    
    if (!fileExt || !allowedTypes.includes(fileExt)) {
      throw new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed.')
    }

    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `${sessionId}/${fileName}`

    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('temp_files')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Extract text content (simplified for now, just for TXT files)
    let content = ''
    if (fileExt === 'txt') {
      const text = await file.text()
      content = text
    }
    // For PDF and DOCX we'll need to implement proper text extraction later

    // Store file metadata
    const { error: dbError } = await supabase
      .from('temp_files')
      .insert({
        filename: file.name,
        file_path: filePath,
        content_type: file.type,
        content,
        session_id: sessionId
      })

    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ 
        message: 'File processed successfully',
        filePath,
        fileName: file.name
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
