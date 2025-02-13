
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
    const { messages, files } = await req.json()

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get content from uploaded files
    let context = ''
    if (files && files.length > 0) {
      const { data: filesData, error: filesError } = await supabase
        .from('temp_files')
        .select('content')
        .in('file_path', files.map((f: any) => f.path))

      if (filesError) throw filesError

      context = filesData
        .map((file: any) => file.content)
        .filter(Boolean)
        .join('\n\n')
    }

    // Prepare system message with context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful assistant. ${
        context ? 'Use the following context to answer questions:\n\n' + context : ''
      }`
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [systemMessage, ...messages],
        model: "mixtral-8x7b-32768",
        temperature: 0.5,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const responseData = await response.json().catch(() => ({}));
      throw new Error(`Groq API error: ${response.status}. ${JSON.stringify(responseData)}`);
    }

    const data = await response.json()

    return new Response(
      JSON.stringify({ response: data.choices[0].message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
