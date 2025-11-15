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
          content: context || `You are Flower, a friendly and helpful home companion for families. Be warm, cheerful, and supportive. Use clear, simple language that everyone can understand. Keep responses brief and natural. Be encouraging and positive. Adapt your tone based on what the user shares - if they sound young, keep it simple; if they sound like an adult, respond naturally. Never assume the user is a child. Respond in whatever language the user speaks to you.`
        },
        { role: "user", content: message }
      ],
      max_tokens: 80,
      temperature: 0.9, // Slightly higher for more natural responses
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