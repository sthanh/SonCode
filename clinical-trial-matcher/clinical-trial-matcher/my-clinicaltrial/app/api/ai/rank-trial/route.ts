import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Trial {
    id: string;
    title: string;
    location: string;
    phase: string;
    description: string;
    url: string;
}

interface Profile {
    conditions: string;
    prior_treatments: string;
    outcomes: string;
    side_effects: string;
    discontinuation_reasons: string;
}

export async function POST(request: Request) {
    try {
        const { profile, trials } : {profile: Profile, trials: Trial[]} = await request.json();

        if (!profile || !trials) {
            return NextResponse.json({ error: 'Profile and trials data are required' }, { status: 400 });
        }

        const rankedTrials = await Promise.all(
            trials.map(async (trial) => {
                const prompt = `
                    Given the following user profile and clinical trial information, rate the relevance of the trial to the user on a scale of 1 to 10.
                    10 means an excellent match, and 1 means a poor match. Provide a brief explanation for your rating.

                    User Profile:
                    Conditions: ${profile.conditions}
                    Past Treatments: ${profile.prior_treatments}
                    Outcomes: ${profile.outcomes}
                    Side Effects: ${profile.side_effects}
                    Discontinuation Reasons: ${profile.discontinuation_reasons}

                    Clinical Trial:
                    Title: ${trial.title}
                    Description: ${trial.description}
                    Phase: ${trial.phase}
                    Location: ${trial.location}

                    Rating (1-10):
                    Explanation:
                `;

                const completion = await openai.chat.completions.create({
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant that ranks clinical trials based on user profiles.',
                        },
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                    model: 'gpt-3.5-turbo',
                    temperature: 0.2, // Lower temperature for more deterministic output
                    response_format: { type: "json_object" },
                });

                const response = completion.choices[0].message.content;
                let parsedResponse: { rating?: number; explanation?: string } = {};
                try {
                    if (response) {
                        parsedResponse = JSON.parse(response);
                    }
                }
                catch (e: any) {
                    console.error("Error parsing the response", response)
                }

                return {
                    ...trial,
                    relevanceScore: parsedResponse.rating || 1, // Default to 1 if parsing fails
                    relevanceExplanation: parsedResponse.explanation || 'No explanation provided.',
                };
            })
        );

        return NextResponse.json(rankedTrials);
    } catch (error) {
        console.error('Error ranking trials:', error);
        return NextResponse.json(
            { error: 'Failed to rank trials' },
            { status: 500 }
        );
    }
}