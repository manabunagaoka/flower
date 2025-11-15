import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message, context } = await request.json();
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // UPGRADED from gpt-3.5-turbo
      messages: [
        { 
          role: "system", 
          content: context || `You are Flower, a friendly home companion. 
                              Be warm and conversational, like a good friend dropping by.
                              Keep responses brief and natural - just chatting, not counseling.
                              Match the user's energy level. If they're casual, be casual.
                              Only show concern if they explicitly mention a problem.
                              Respond in whatever language the user speaks to you.`
        },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.8, // Slightly higher for more natural responses
      stream: false // Set to true if you want streaming
    });

    return NextResponse.json({ 
      reply: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('OpenAI error:', error);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}