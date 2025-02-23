
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@^0.1.0"

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
    const allowedTypes = ['txt']
    
    if (!fileExt || !allowedTypes.includes(fileExt)) {
      throw new Error('Invalid file type. Only TXT files are allowed.')
    }

    // Extract text content from the file
    const text = await file.text()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `${sessionId}/${fileName}`

    // Initialize Google AI
    const genAI = new GoogleGenerativeAI(Deno.env.get('GOOGLE_API_KEY') ?? '')
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash-8b' })

    // Generate initial analysis of the document
    const result = await model.generateContent(`
      Analyze this text document and provide a brief summary of its key points and main topics:
      
      ${text}
    `)
    const analysis = result.response.text()

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('temp_files')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Store file metadata, content, and analysis in the database
    const { error: dbError } = await supabase
      .from('temp_files')
      .insert({
        filename: file.name,
        file_path: filePath,
        content: text,
        analysis: analysis,
        content_type: file.type,
        session_id: sessionId
      })

    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ 
        message: 'File processed successfully',
        filePath,
        fileName: file.name,
        analysis
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
