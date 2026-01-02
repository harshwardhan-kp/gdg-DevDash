import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { SYSTEM_PROMPT, USER_PROMPT_TEMPLATE } from '@/lib/prompts';

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== 'string') {
            return new Response(
                JSON.stringify({ error: 'Message is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = streamText({
            model: groq('openai/gpt-oss-120b'),
            system: SYSTEM_PROMPT,
            prompt: USER_PROMPT_TEMPLATE(message),
            temperature: 0.7,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API error:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to generate response',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
