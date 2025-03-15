import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Classify the user's message
    const classificationResponse = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a classifier that determines if a user\'s message is related to clinical trials or mental health. ' +
            'Respond with "clinical trial" or "mental health".',
        },
        {
          role: 'user',
          content: messages[messages.length - 1].text,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const classification = classificationResponse.choices[0].message.content?.trim().toLowerCase();

    let systemPrompt = '';
    if (classification === 'clinical trial') {
      systemPrompt =
        'You are a helpful assistant that can answer questions about clinical trials. ' +
        'Provide factual information and cite sources.';
    } else {
      systemPrompt =
        'You are a supportive companion for someone dealing with health stress. ' +
        'Respond with empathy and offer coping suggestions. Do not offer medical advice.';
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
      ],
      model: 'gpt-3.5-turbo',
    });

    const botResponse = completion.choices[0].message.content;

    return NextResponse.json({ message: botResponse });
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return NextResponse.json(
      { error: 'Failed to get chatbot response' },
      { status: 500 }
    );
  }
}