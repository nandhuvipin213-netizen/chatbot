import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ Warning: GEMINI_API_KEY is not defined in backend/.env');
}

export const ai = new GoogleGenAI({
  apiKey: apiKey || '',
});

export const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
