import { CONFIG } from "../config";

export class AIService {
  private static async callOpenRouter(messages: { role: string; content: string }[]): Promise<string> {
    if (!CONFIG.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not set");
    }

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CONFIG.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://microai.paygate", 
          "X-Title": "MicroAI Paygate",
        },
        body: JSON.stringify({
          model: CONFIG.OPENROUTER_MODEL,
          messages: messages,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json() as any;
      return data.choices[0]?.message?.content || "";
    } catch (error) {
      console.error("AI Service Error:", error);
      throw error;
    }
  }

  static async summarize(text: string): Promise<string> {
    if (!text) throw new Error("Input text is required");
    
    const messages = [
      { role: "system", content: "You are a helpful assistant that summarizes text concisely." },
      { role: "user", content: `Please summarize the following text:\n\n${text}` }
    ];
    
    return this.callOpenRouter(messages);
  }

  static async analyzeSentiment(text: string): Promise<string> {
    if (!text) throw new Error("Input text is required");

    const messages = [
      { role: "system", content: "You are a sentiment analysis tool. Respond with only one word: POSITIVE, NEGATIVE, or NEUTRAL." },
      { role: "user", content: `Analyze the sentiment of the following text:\n\n${text}` }
    ];

    return this.callOpenRouter(messages);
  }
}
