// src/services/llmService.js

import { OpenAI } from 'openai';
import { CohereClientV2 } from 'cohere-ai';
import Anthropic from '@anthropic-ai/sdk';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Prompt to be reused
const buildPrompt = (tasks) =>
    `Summarize the following tasks by organizing them according to priority levels and including their due dates. The summary should be clear, concise, and suitable for quick reference:\n${tasks}`;

// === INDIVIDUAL PROVIDER FUNCTIONS ===

const generateWithOpenAI = async (tasks) => {
    const prompt = buildPrompt(tasks);
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
};

const generateWithCohere = async (tasks) => {
    const prompt = buildPrompt(tasks);
    const response = await cohere.generate({
        model: 'command-r-plus',
        prompt,
        maxTokens: 200,
        temperature: 0.5,
    });
    return response.generations[0]?.text.trim();
};

const generateWithAnthropic = async (tasks) => {
    const prompt = `\n\nHuman: ${buildPrompt(tasks)}\n\nAssistant:`;
    const response = await anthropic.completions.create({
        model: 'claude-3-sonnet-20240229',
        prompt,
        max_tokens_to_sample: 200,
        temperature: 0.5,
        stop_sequences: ['\n\nHuman:'],
    });
    return response.completion.trim();
};

// === FALLBACK FUNCTION ===

const generateWithFallback = async (tasks) => {
    const methods = [
        { name: 'OpenAI', fn: generateWithOpenAI },
        { name: 'Cohere', fn: generateWithCohere },
        { name: 'Anthropic', fn: generateWithAnthropic },
    ];

    for (const method of methods) {
        try {
            console.log(`Trying ${method.name}...`);
            const result = await method.fn(tasks);
            console.log(`${method.name} succeeded.`);
            return result;
        } catch (error) {
            console.error(`${method.name} failed:`, error.message);
        }
    }

    throw new Error('All LLM providers failed to generate a summary.');
};

export default {
    generateWithOpenAI,
    generateWithCohere,
    generateWithAnthropic,
    generateWithFallback,
};
