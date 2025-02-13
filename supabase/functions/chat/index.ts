
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GroqChat } from "npm:@groq/groq-sdk"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    const client = new GroqChat({
      apiKey: Deno.env.get('GROQ_API_KEY')
    })

    const chatCompletion = await client.chat.completions.create({
      messages,
      model: "mixtral-8x7b-32768",
      temperature: 0.5,
      max_tokens: 1024,
    })

    return new Response(
      JSON.stringify({ response: chatCompletion.choices[0].message }),
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
