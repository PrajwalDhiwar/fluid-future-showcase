
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
      console.log("Retrieving file content from database...");
      const { data: filesData, error: filesError } = await supabase
        .from('temp_files')
        .select('content, analysis')
        .in('file_path', files.map((f: any) => f.path))

      if (filesError) {
        console.error("Error retrieving files:", filesError);
        throw filesError;
      }

      if (!filesData || filesData.length === 0) {
        console.error("No file data found for paths:", files.map((f: any) => f.path));
      } else {
        console.log(`Found ${filesData.length} files in database`);
        context = filesData
          .map((file: any) => `Document content:\n${file.content}\n\nDocument analysis:\n${file.analysis}`)
          .filter(Boolean)
          .join('\n\n')
      }
    }

    // Initialize Google AI
    const genAI = new GoogleGenerativeAI(Deno.env.get('GOOGLE_API_KEY') ?? '')
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash-8b' })

    // Convert messages to Gemini format
    const chatHistory = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [msg.content]
    }))

    // Start chat
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      }
    })

    // Prepare system instruction for markdown formatting
    const systemInstruction = `
You are an AI assistant helping users with their documents. 
Always format your responses using Markdown to improve readability:
- Use **bold** for emphasis
- Use bullet points or numbered lists for steps or items
- Use headings (## Heading) for sections
- Use \`code blocks\` for any technical content
- Use > blockquotes for important notes

Based on the provided document, answer the user's questions thoroughly.
    `;

    // Send message with context and system instruction
    const userQuestion = messages[messages.length - 1].content;
    let prompt;
    
    if (context) {
      prompt = `${systemInstruction}\n\nContext from uploaded documents:\n\n${context}\n\nUser question: ${userQuestion}`;
    } else {
      prompt = `${systemInstruction}\n\nUser question: ${userQuestion}`;
    }

    console.log("Sending prompt to Gemini...");
    const result = await chat.sendMessage(prompt);
    console.log("Received response from Gemini");
    const response = await result.response.text();

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
