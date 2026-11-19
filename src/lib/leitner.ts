/**
 * Pure functions for Spaced Repetition (Leitner System with 5 boxes)
 */

export const LEITNER_INTERVALS: Record<number, number> = {
  1: 1,  // 1 day
  2: 2,  // 2 days
  3: 4,  // 4 days
  4: 8,  // 8 days
  5: 16, // 16 days
};

export type LeitnerRating = 'good' | 'unsure' | 'bad';

export interface LeitnerUpdateResult {
  nextBox: 1 | 2 | 3 | 4 | 5;
  intervalDays: number;
  nextReviewDate: string; // ISO date string YYYY-MM-DD
}

/**
 * Calculates next box and review date based on rating
 */
export function calculateNextReview(
  currentBox: number,
  rating: LeitnerRating,
  baseDate: Date = new Date()
): LeitnerUpdateResult {
  let nextBox: 1 | 2 | 3 | 4 | 5 = 1;

  if (rating === 'good') {
    nextBox = Math.min(5, Math.max(1, currentBox + 1)) as 1 | 2 | 3 | 4 | 5;
  } else if (rating === 'unsure') {
    nextBox = Math.min(5, Math.max(1, currentBox)) as 1 | 2 | 3 | 4 | 5;
  } else {
    // 'bad' (quên) resets to Box 1
    nextBox = 1;
  }

  const intervalDays = LEITNER_INTERVALS[nextBox] || 1;
  const nextDate = new Date(baseDate.getTime());
  nextDate.setDate(nextDate.getDate() + intervalDays);

  const nextReviewDate = nextDate.toISOString().split('T')[0];

  return {
    nextBox,
    intervalDays,
    nextReviewDate,
  };
}

/**
 * Determines whether a question is due for review today or overdue
 */
export function isDue(nextReviewDateStr?: string, todayStr?: string): boolean {
  if (!nextReviewDateStr) return true;
  const today = todayStr || new Date().toISOString().split('T')[0];
  return nextReviewDateStr <= today;
}
