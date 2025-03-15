import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { query, profile } = await request.json();

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that enhances search queries for clinical trials. ' +
            'Based on the user\'s query and profile, expand the query with relevant terms, synonyms, or related conditions. ' +
            'Return only the enhanced query string.',
        },
        {
          role: 'user',
          content: `Query: ${query}\nProfile: ${profile}`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

      const enhancedQuery = completion.choices[0].message.content;

    return NextResponse.json({ enhancedQuery });
  } catch (error) {
    console.error('Error enhancing query:', error);
    return NextResponse.json(
      { error: 'Failed to enhance query' },
      { status: 500 }
    );
  }
}