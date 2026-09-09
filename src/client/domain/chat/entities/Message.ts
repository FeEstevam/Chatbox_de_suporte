/**
 * Domain Entity: Message
 * Representa uma mensagem no chat de suporte
 */
export type MessageRole = "user" | "agent";

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  time: string; // formatted time string HH:MM
  timestamp: number; // unix ms for sorting
}

export function createMessage(role: MessageRole, text: string): Message {
  const now = new Date();
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    text,
    time: now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    timestamp: now.getTime(),
  };
}
