import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      console.error('No audio file in request');
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    console.log('Received audio file:', {
      name: audioFile.name,
      type: audioFile.type,
      size: audioFile.size
    });

    // OpenAI Whisper supports: mp3, mp4, mpeg, mpga, m4a, wav, webm
    // iOS Safari typically outputs webm or mp4
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en',
    });

    console.log('Transcription result:', transcription.text);
    
    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error('Whisper API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', {
      message: errorMessage,
      error
    });
    return NextResponse.json(
      { error: 'Failed to transcribe audio', details: errorMessage },
      { status: 500 }
    );
  }
}
