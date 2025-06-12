
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();
    
    const groqApiKey = Deno.env.get('GROQ_API');
    if (!groqApiKey) {
      throw new Error('GROQ_API key not found');
    }

    const systemPrompt = `You are StartupGPT, an AI legal companion specialized in Nigerian startup law. You provide accurate, actionable legal guidance for Nigerian entrepreneurs.

Key areas of expertise:
- CAC company registration and compliance
- Nigerian startup legal documents (shareholder agreements, employment contracts, MEMART)
- Equity structures and ESOP implementation
- Regulatory compliance (FIRS tax, SEC securities law)
- Intellectual property protection in Nigeria
- Investment and funding legal requirements
- Dispute resolution mechanisms

Always:
- Cite relevant Nigerian laws (Companies and Allied Matters Act 2020, etc.)
- Provide step-by-step actionable guidance
- Include cost estimates in Naira (₦)
- Mention timeframes for legal processes
- Add disclaimers for complex matters requiring human lawyers
- Format responses with clear headings and bullet points

Context about user: ${context || 'No specific context provided'}

Respond professionally but conversationally. Always end complex responses with "Need help implementing this? I can generate the documents for you."`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
