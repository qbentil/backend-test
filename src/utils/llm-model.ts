import axios from 'axios';

export class AIModel {
  static async callLLM(prompt: string) {
    const API_URL =
      process.env.AI_API_URL || 'https://gemini-api.example.com/generate';
    const API_KEY = process.env.AI_API_KEY || 'your-api-key';

    try {
      const response = await axios.post(
        API_URL,
        { prompt },
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );

      return response.data.result;
    } catch (error) {
      throw new Error('Failed to generate AI response');
    }
  }
}
