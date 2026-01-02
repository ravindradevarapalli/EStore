
import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class AIService {
  // Fixed: Initialize GoogleGenAI using process.env.API_KEY directly as per SDK requirements
  private ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  async getProductReviewInsight(product: Product): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Provide a 3-sentence sophisticated sales pitch and a "Lumina Pro Tip" for this product: ${product.name}. Description: ${product.description}`,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text;
    } catch (error) {
      console.error('AI Insight Error:', error);
      return "Unlock the full potential of your lifestyle with our premium technology. Each detail is crafted for your success.";
    }
  }

  async getPersonalShopperAdvice(query: string, products: Product[]): Promise<string> {
    const productList = products.map(p => `${p.name} ($${p.price})`).join(', ');
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a personal shopper for a high-end tech store. A customer asks: "${query}". Based on these products: [${productList}], recommend the best 1-2 items and briefly explain why. Keep it elegant and helpful.`,
      });
      return response.text;
    } catch (error) {
      return "I recommend browsing our featured collections for the best value and performance.";
    }
  }
}
