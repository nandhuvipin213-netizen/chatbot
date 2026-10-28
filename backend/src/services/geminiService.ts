import { ai, DEFAULT_MODEL } from '../config/gemini';
import { IMessage } from '../models/Conversation';

export const generateGeminiReply = async (
  prompt: string,
  history: IMessage[] = []
): Promise<string> => {
  try {
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Map conversation context history for Gemini
    for (const msg of history) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      });
    }

    // Add newest user message
    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    const modelName = process.env.GEMINI_MODEL || DEFAULT_MODEL;

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
    });

    const reply = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      throw new Error('Gemini API returned an empty response.');
    }

    return reply;
  } catch (error: any) {
    console.error('Gemini Service Error:', error);

    // Parse nested Google API error JSON if present
    let rawMsg = error.message || '';
    try {
      const parsed = JSON.parse(rawMsg);
      if (parsed.error?.message) {
        rawMsg = parsed.error.message;
      }
    } catch {
      // String message
    }

    if (error.status === 400 || rawMsg.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Gemini API Key. Please verify your GEMINI_API_KEY in backend/.env');
    }
    if (error.status === 429 || rawMsg.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('Gemini API rate limit or quota exceeded. Please wait a moment and try again.');
    }
    if (error.status === 503 || rawMsg.includes('high demand') || rawMsg.includes('UNAVAILABLE')) {
      throw new Error('Gemini is currently experiencing high demand. Please retry your message in a few moments.');
    }

    throw new Error(rawMsg || 'Failed to generate response from Gemini API.');
  }
};
