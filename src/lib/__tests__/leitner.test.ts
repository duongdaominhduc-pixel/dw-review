import { describe, it, expect } from 'vitest';
import { calculateNextReview, isDue } from '../leitner';

describe('Leitner Spaced Repetition System', () => {
  const baseDate = new Date('2026-11-20T00:00:00.000Z');

  it('progresses box from 1 to 5 on good rating', () => {
    // Box 1 -> 2 (2 days)
    const res1 = calculateNextReview(1, 'good', baseDate);
    expect(res1.nextBox).toBe(2);
    expect(res1.intervalDays).toBe(2);

    // Box 2 -> 3 (4 days)
    const res2 = calculateNextReview(2, 'good', baseDate);
    expect(res2.nextBox).toBe(3);
    expect(res2.intervalDays).toBe(4);

    // Box 4 -> 5 (16 days)
    const res4 = calculateNextReview(4, 'good', baseDate);
    expect(res4.nextBox).toBe(5);
    expect(res4.intervalDays).toBe(16);

    // Box 5 stays at Box 5 (16 days)
    const res5 = calculateNextReview(5, 'good', baseDate);
    expect(res5.nextBox).toBe(5);
    expect(res5.intervalDays).toBe(16);
  });

  it('keeps current box on unsure rating', () => {
    const res = calculateNextReview(3, 'unsure', baseDate);
    expect(res.nextBox).toBe(3);
    expect(res.intervalDays).toBe(4);
  });

  it('resets to box 1 on bad rating (quên)', () => {
    const res = calculateNextReview(4, 'bad', baseDate);
    expect(res.nextBox).toBe(1);
    expect(res.intervalDays).toBe(1);
  });

  it('determines isDue correctly', () => {
    expect(isDue(undefined)).toBe(true);
    expect(isDue('2026-11-19', '2026-11-20')).toBe(true); // yesterday is due
    expect(isDue('2026-11-20', '2026-11-20')).toBe(true); // today is due
    expect(isDue('2026-11-21', '2026-11-20')).toBe(false); // tomorrow is not due
  });
});
