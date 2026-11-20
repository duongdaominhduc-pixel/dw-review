import { describe, it, expect } from 'vitest';
import questionsData from '../../data/questions.json';
import chaptersData from '../../data/chapters.json';
import { Question, Chapter } from '../../types';

describe('Data Schema Validation', () => {
  it('loads all questions covering 40 questions and detailed chapter study items', () => {
    expect(questionsData.length).toBeGreaterThanOrEqual(47);
  });

  it('validates each question conforms to schema', () => {
    const questions = questionsData as Question[];
    const ids = new Set<string>();

    for (const q of questions) {
      expect(q.id).toBeDefined();
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);

      expect(q.number).toBeDefined();
      expect(q.chapterId).toBeDefined();
      expect(q.topic).toBeDefined();
      expect(['theory', 'formula', 'calculation', 'diagram']).toContain(q.type);
      expect(q.prompt).toBeTruthy();
      expect(q.answer).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(typeof q.needsSlideCheck).toBe('boolean');
    }
  });

  it('checks theory questions flagged with needsSlideCheck', () => {
    const questions = questionsData as Question[];
    // Questions 1-15, 30, 35-39 should have needsSlideCheck = true
    const checkNums = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '30', '35', '36', '37', '38', '39'
    ];
    for (const num of checkNums) {
      const q = questions.find(item => item.number === num);
      expect(q).toBeDefined();
      expect(q!.needsSlideCheck).toBe(true);
    }
  });

  it('validates chapters conform to schema', () => {
    const chapters = chaptersData as Chapter[];
    expect(chapters.length).toBe(8);

    // Chapter 1 has all 8 fully completed lessons
    const ch1 = chapters.find(c => c.id === 'ch1');
    expect(ch1).toBeDefined();
    expect(ch1!.lessons.length).toBe(8);
    expect(ch1!.lessons.every(l => l.status === 'done')).toBe(true);
    expect(ch1!.lessons.every(l => l.sections.length > 0)).toBe(true);

    // Lessons in other chapters have empty status as specified
    const otherChapterLessons = chapters.filter(c => c.id !== 'ch1').flatMap(c => c.lessons);
    expect(otherChapterLessons.every(l => l.status === 'empty')).toBe(true);
  });
});
