
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
    // Validate request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return new Response(
        JSON.stringify({ error: 'Invalid request body. Expected JSON.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { message, context } = requestBody;
    
    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be a non-empty string.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get GROQ_API key
    const groqApiKey = Deno.env.get('GROQ_API');
    console.log('GROQ_API key exists:', groqApiKey ? 'Yes (length: ' + groqApiKey.length + ')' : 'No');
    console.log('GROQ_API key preview:', groqApiKey ? groqApiKey.substring(0, 10) + '...' : 'N/A');
    
    if (!groqApiKey) {
      console.error('GROQ_API key not found in environment variables');
      console.error('Available env vars:', Object.keys(Deno.env.toObject()).filter(k => k.includes('GROQ') || k.includes('API')));
      return new Response(
        JSON.stringify({ error: 'GROQ_API key not configured. Please set the GROQ_API secret in Supabase Edge Functions secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.3,
        max_tokens: 1000,
        stream: false,
      }),
    });

    if (!response.ok) {
      let errorText;
      try {
        errorText = await response.text();
        // Try to parse as JSON for better error message
        try {
          const errorJson = JSON.parse(errorText);
          console.error(`Groq API error (${response.status}):`, JSON.stringify(errorJson, null, 2));
          errorText = errorJson.error?.message || errorJson.error || errorText;
        } catch {
          console.error(`Groq API error (${response.status}):`, errorText);
        }
      } catch (e) {
        errorText = `Failed to read error response: ${e}`;
        console.error('Error reading Groq API error response:', e);
      }
      
      return new Response(
        JSON.stringify({ 
          error: `Groq API error: ${response.status}`,
          details: errorText,
          hint: response.status === 400 ? 'Check API key validity and model name. Common issues: invalid API key, wrong model name, or malformed request.' : ''
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse response
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Failed to parse Groq API response:', e);
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate response structure
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error('Invalid Groq API response structure:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI service.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = data.choices[0]?.message?.content;
    if (!aiResponse) {
      console.error('No content in AI response:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: 'AI service returned empty response.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unexpected error in chat-ai function:', error);
    return new Response(
      JSON.stringify({ 
        error: error?.message || 'An unexpected error occurred',
        type: error?.constructor?.name || 'UnknownError'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
