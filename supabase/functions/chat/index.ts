
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
        .select('content, analysis')
        .in('file_path', files.map((f: any) => f.path))

      if (filesError) throw filesError

      context = filesData
        .map((file: any) => `Document content:\n${file.content}\n\nDocument analysis:\n${file.analysis}`)
        .filter(Boolean)
        .join('\n\n')
    }

    // Initialize Google AI
    const genAI = new GoogleGenerativeAI(Deno.env.get('GOOGLE_API_KEY') ?? '')
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Convert messages to Gemini format
    const chatHistory = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [msg.content]
    }))

    // Start chat
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7
      }
    })

    // Send message with context
    const prompt = context 
      ? `Based on this context:\n\n${context}\n\nUser question: ${messages[messages.length - 1].content}`
      : messages[messages.length - 1].content

    const result = await chat.sendMessage(prompt)
    const response = result.response.text()

    return new Response(
      JSON.stringify({ 
        response: {
          role: 'assistant',
          content: response
        }
      }),
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
