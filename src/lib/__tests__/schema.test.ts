import { describe, it, expect } from 'vitest';
import questionsData from '../../data/questions.json';
import chaptersData from '../../data/chapters.json';
import chapter1QuestionsData from '../../data/chapter1Questions.json';
import chapter2QuestionsData from '../../data/chapter2Questions.json';
import chapter3QuestionsData from '../../data/chapter3Questions.json';
import chapter4QuestionsData from '../../data/chapter4Questions.json';
import chapter5QuestionsData from '../../data/chapter5Questions.json';
import chapter6QuestionsData from '../../data/chapter6Questions.json';
import chapter7QuestionsData from '../../data/chapter7Questions.json';
import chapter8QuestionsData from '../../data/chapter8Questions.json';
import { Question, Chapter } from '../../types';

describe('Data Schema Validation', () => {
  it('loads exactly 47 questions covering all 40 questions and sub-items', () => {
    expect(questionsData.length).toBe(47);
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

    // Chapter 2 has all 8 fully completed lessons
    const ch2 = chapters.find(c => c.id === 'ch2');
    expect(ch2).toBeDefined();
    expect(ch2!.lessons.length).toBe(8);
    expect(ch2!.lessons.every(l => l.status === 'done')).toBe(true);
    expect(ch2!.lessons.every(l => l.sections.length > 0)).toBe(true);

    // Chapter 3 has all 8 fully completed lessons
    const ch3 = chapters.find(c => c.id === 'ch3');
    expect(ch3).toBeDefined();
    expect(ch3!.lessons.length).toBe(8);
    expect(ch3!.lessons.every(l => l.status === 'done')).toBe(true);
    expect(ch3!.lessons.every(l => l.sections.length > 0)).toBe(true);

    // Chapter 4 has all 8 fully completed lessons
    const ch4 = chapters.find(c => c.id === 'ch4');
    expect(ch4).toBeDefined();
    expect(ch4!.lessons.length).toBe(8);
    expect(ch4!.lessons.every(l => l.status === 'done')).toBe(true);
    expect(ch4!.lessons.every(l => l.sections.length > 0)).toBe(true);

    // Chapter 5 has all 8 fully completed lessons
    const ch5 = chapters.find(c => c.id === 'ch5');
    expect(ch5).toBeDefined();
    expect(ch5!.lessons.length).toBe(8);
    expect(ch5!.lessons.every(l => l.status === 'done')).toBe(true);
    expect(ch5!.lessons.every(l => l.sections.length > 0)).toBe(true);

    // Chapter 6 has all 8 fully completed lessons
    const ch6 = chapters.find(c => c.id === 'ch6');
    expect(ch6).toBeDefined();
    expect(ch6!.lessons.length).toBe(8);
    expect(ch6!.lessons.every(l => l.status === 'done')).toBe(true);
    expect(ch6!.lessons.every(l => l.sections.length > 0)).toBe(true);

    // Chapter 7 has all 8 fully completed lessons
    const ch7 = chapters.find(c => c.id === 'ch7');
    expect(ch7).toBeDefined();
    expect(ch7!.lessons.length).toBe(8);
    expect(ch7!.lessons.every(l => l.status === 'done')).toBe(true);
    expect(ch7!.lessons.every(l => l.sections.length > 0)).toBe(true);

    // Chapter 8 has all 8 fully completed lessons
    const ch8 = chapters.find(c => c.id === 'ch8');
    expect(ch8).toBeDefined();
    expect(ch8!.lessons.length).toBe(8);
    expect(ch8!.lessons.every(l => l.status === 'done')).toBe(true);
    expect(ch8!.lessons.every(l => l.sections.length > 0)).toBe(true);

    // All 8 chapters are now 100% completed
    const allLessons = chapters.flatMap(c => c.lessons);
    expect(allLessons.length).toBe(64);
    expect(allLessons.every(l => l.status === 'done')).toBe(true);
  });

  it('validates Chapter 1, 2, 3, 4, 5, 6, 7, 8 slide questions', () => {
    expect(chapter1QuestionsData.length).toBe(47);
    expect(chapter2QuestionsData.length).toBe(50);
    expect(chapter3QuestionsData.length).toBe(50);
    expect(chapter4QuestionsData.length).toBe(50);
    expect(chapter5QuestionsData.length).toBe(50);
    expect(chapter6QuestionsData.length).toBe(50);
    expect(chapter7QuestionsData.length).toBe(50);
    expect(chapter8QuestionsData.length).toBe(50);

    for (const q of chapter8QuestionsData as Question[]) {
      expect(q.id).toBeDefined();
      expect(q.number).toBeDefined();
      expect(q.chapterId).toBe('ch8');
      expect(q.prompt).toBeTruthy();
      expect(q.answer).toBeTruthy();
      expect(q.explanation).toBeTruthy();
    }
  });
});
