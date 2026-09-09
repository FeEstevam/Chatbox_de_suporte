/**
 * Domain Entity: Goal
 * Representa uma meta financeira do usuário
 */
export type GoalStatus = "active" | "completed" | "paused";

export interface Goal {
  id: string;
  name: string;
  description?: string;
  current: number;
  target: number;
  deadline?: string; // ISO date string
  status: GoalStatus;
  color?: string;
  icon?: string;
}

export function createGoal(partial: Omit<Goal, "id">): Goal {
  return {
    id: `goal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ...partial,
  };
}

export function goalProgressPercent(goal: Goal): number {
  if (goal.target <= 0) return 0;
  return Math.min(100, (goal.current / goal.target) * 100);
}
