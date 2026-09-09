/**
 * Application Service: ChatService
 * Orquestra o processamento de mensagens do chat:
 * — se há API key configurada, tenta Gemini (com fallback ao motor local)
 * — caso contrário, usa apenas o motor local
 */
import { ChatContext, processLocalQuery } from "../../../lib/chat-bot-engine";
import { callGemini } from "../../../infrastructure/ai/GeminiProvider";

const GEMINI_API_KEY_STORAGE = "cashflow:gemini_api_key";

export function getGeminiApiKey(): string | null {
  return localStorage.getItem(GEMINI_API_KEY_STORAGE);
}

export function setGeminiApiKey(key: string): void {
  localStorage.setItem(GEMINI_API_KEY_STORAGE, key);
}

export function clearGeminiApiKey(): void {
  localStorage.removeItem(GEMINI_API_KEY_STORAGE);
}

/**
 * Processa uma mensagem do usuário e retorna a resposta do assistente.
 * Usa Gemini se disponível, caso contrário motor local.
 */
export async function processChatMessage(
  userMessage: string,
  context: ChatContext
): Promise<string> {
  const apiKey = getGeminiApiKey();

  if (apiKey) {
    const geminiReply = await callGemini(userMessage, context, { apiKey });
    if (geminiReply) return geminiReply;
  }

  // Fallback para motor local (síncrono)
  return processLocalQuery(userMessage, context);
}
