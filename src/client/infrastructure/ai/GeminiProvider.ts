/**
 * Infrastructure: GeminiProvider
 * Encapsula chamadas à API do Google Gemini
 */
import { ChatContext } from "../../lib/chat-bot-engine";
import { processLocalQuery } from "../../lib/chat-bot-engine";

export interface GeminiConfig {
  apiKey: string;
  model?: string;
}

function buildSystemPrompt(context: ChatContext): string {
  const financialSummary = {
    usuario: context.userName,
    totalTransacoes: context.transactions.length,
    saldoLiquido: context.transactions.reduce(
      (s, t) => s + (t.type === "income" ? t.amount : -t.amount),
      0
    ),
    despesasMes: context.transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0),
    receitasMes: context.transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0),
    contas: context.accounts.map((a) => ({ nome: a.name, saldo: a.balance })),
    metas: context.goals.map((g) => ({
      nome: g.name,
      atual: g.current,
      alvo: g.target,
    })),
  };

  return `Você é o assistente de inteligência financeira e suporte do CashFlow (plataforma de gestão financeira patrimonial).
Responda de forma clara, didática, prestativa, elegante e concisa em Português do Brasil.
Dados financeiros atuais do usuário:
${JSON.stringify(financialSummary, null, 2)}
Instruções:
- Se for dúvida sobre o app (scanner, metas, contas, 50/30/20, privacidade, relatórios), explique com passo a passo.
- Se for análise financeira, use os dados fornecidos com respeito à privacidade.
- Se for conceito de finanças, cartões/milhas, finanças PJ, impostos, bancos ou emergências cotidianas, responda com riqueza e clareza.
- Use formatação Markdown (negrito, tópicos).`;
}

/**
 * Chama a API Gemini e retorna a resposta.
 * Em caso de falha, retorna null (caller decide o fallback).
 */
export async function callGemini(
  userMessage: string,
  context: ChatContext,
  config: GeminiConfig
): Promise<string | null> {
  const model = config.model ?? "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: buildSystemPrompt(context) },
              { text: `Pergunta do usuário: ${userMessage}` },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
    return text ?? null;
  } catch (err) {
    console.error("[GeminiProvider] Request failed:", err);
    return null;
  }
}

/**
 * Consulta Gemini com fallback automático para o motor local
 */
export async function queryWithFallback(
  userMessage: string,
  context: ChatContext,
  config: GeminiConfig
): Promise<string> {
  const geminiReply = await callGemini(userMessage, context, config);
  if (geminiReply) return geminiReply;
  return processLocalQuery(userMessage, context);
}
