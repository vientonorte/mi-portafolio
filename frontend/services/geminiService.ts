import { GoogleGenAI, Chat } from '@google/genai';
import { SYSTEM_PROMPT } from '../constants.ts';

class GeminiService {
  private ai: GoogleGenAI;
  private chatSession: Chat | null = null;

  constructor() {
    // Initialize the SDK. It expects process.env.API_KEY to be available in the environment.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
  }

  private initChat() {
    this.chatSession = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7, // Slightly creative but focused
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.chatSession) {
      this.initChat();
    }

    try {
      if (!this.chatSession) throw new Error("Chat session failed to initialize.");
      const response = await this.chatSession.sendMessage({ message });
      return response.text || "Lo siento, no pude generar una respuesta.";
    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      throw new Error("Hubo un problema al conectar con el servidor. Por favor, intenta de nuevo.");
    }
  }
  
  resetChat() {
      this.chatSession = null;
  }
}

export const geminiService = new GeminiService();
