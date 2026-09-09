/**
 * Lib: Auth
 * Gerencia a sessão do usuário via localStorage
 */

const SESSION_KEY = "cashflow:session";

export interface UserSession {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  createdAt: string;
}

/**
 * Retorna a sessão do usuário atual ou null se não houver sessão ativa.
 */
export function getSession(): UserSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserSession;
  } catch {
    return null;
  }
}

/**
 * Cria ou substitui a sessão do usuário atual.
 */
export function setSession(session: UserSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Cria uma sessão de visitante genérica se nenhuma sessão existir.
 * Útil para desenvolvimento e demonstração.
 */
export function ensureSession(): UserSession {
  const existing = getSession();
  if (existing) return existing;

  const guest: UserSession = {
    id: `usr-${Date.now()}`,
    name: "Usuário",
    email: undefined,
    phone: undefined,
    avatar_url: undefined,
    createdAt: new Date().toISOString(),
  };
  setSession(guest);
  return guest;
}

/**
 * Remove a sessão do usuário (logout).
 */
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Retorna o nome de exibição do usuário ou fallback.
 */
export function getUserDisplayName(fallback = "Usuário"): string {
  return getSession()?.name ?? fallback;
}
