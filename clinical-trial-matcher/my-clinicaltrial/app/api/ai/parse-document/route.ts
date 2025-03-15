import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { fileUrl } = await request.json();

        const response = await fetch(fileUrl);
        const blob = await response.blob();

        const loader = new PDFLoader(blob);

        const docs = await loader.load();

        let content = ''

        for(const doc of docs){
            content += doc.pageContent
        }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that extracts information from medical documents. ' +
            'Identify the following entities: conditions, treatments, outcomes, side effects, and reasons for treatment discontinuation.' +
            'Return the extracted information in a JSON format.',
        },
        {
          role: 'user',
          content: content,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const parsedData = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error parsing document:', error);
    return NextResponse.json(
      { error: 'Failed to parse document' },
      { status: 500 }
    );
  }
}