import { defineStore } from 'pinia';
import { UserProgress } from '../types';
import { calculateNextReview, isDue, LeitnerRating } from '../lib/leitner';
import questionsData from '../data/questions.json';

const STORAGE_KEY = 'dw_study_user_progress_v1';

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progressMap: {} as Record<string, UserProgress>,
    weakStudySet: [] as string[], // custom set for "Bộ ôn chỗ yếu"
  }),

  getters: {
    getProgress: (state) => (questionId: string): UserProgress => {
      if (!state.progressMap[questionId]) {
        return {
          questionId,
          box: 1,
          nextReview: new Date().toISOString().split('T')[0],
          correctCount: 0,
          wrongCount: 0,
        };
      }
      return state.progressMap[questionId];
    },

    dueQuestions: (state) => {
      const today = new Date().toISOString().split('T')[0];
      return questionsData.filter(q => {
        const p = state.progressMap[q.id];
        return !p || isDue(p.nextReview, today);
      });
    },

    weakQuestions: (state) => {
      return questionsData.filter(q => {
        const p = state.progressMap[q.id];
        if (!p) return false;
        return p.wrongCount > p.correctCount || p.lastResult === 'bad' || state.weakStudySet.includes(q.id);
      });
    },

    boxCounts: (state) => {
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      for (const q of questionsData) {
        const p = state.progressMap[q.id];
        const box = p ? p.box : 1;
        counts[box]++;
      }
      return counts;
    },

    totalQuestions: () => questionsData.length,

    learnedCount: (state) => {
      return Object.values(state.progressMap).filter(p => p.box >= 3).length;
    },
  },

  actions: {
    init() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          this.progressMap = parsed.progressMap || {};
          this.weakStudySet = parsed.weakStudySet || [];
        }
      } catch (e) {
        console.error('Failed to load user progress from localStorage', e);
      }
    },

    save() {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            progressMap: this.progressMap,
            weakStudySet: this.weakStudySet,
          })
        );
      } catch (e) {
        console.error('Failed to save user progress', e);
      }
    },

    rateQuestion(questionId: string, rating: LeitnerRating) {
      const current = this.getProgress(questionId);
      const { nextBox, nextReviewDate } = calculateNextReview(current.box, rating);

      this.progressMap[questionId] = {
        ...current,
        box: nextBox,
        nextReview: nextReviewDate,
        lastResult: rating,
        correctCount: rating === 'good' ? current.correctCount + 1 : current.correctCount,
        wrongCount: rating === 'bad' ? current.wrongCount + 1 : current.wrongCount,
      };

      if (rating === 'bad' && !this.weakStudySet.includes(questionId)) {
        this.weakStudySet.push(questionId);
      } else if (rating === 'good' && nextBox >= 4) {
        this.weakStudySet = this.weakStudySet.filter(id => id !== questionId);
      }

      this.save();
    },

    setCustomAnswer(questionId: string, customAnswer: string, customExplanation?: string) {
      const current = this.getProgress(questionId);
      this.progressMap[questionId] = {
        ...current,
        customAnswer,
        customExplanation,
        slideChecked: true,
      };
      this.save();
    },

    toggleSlideChecked(questionId: string) {
      const current = this.getProgress(questionId);
      this.progressMap[questionId] = {
        ...current,
        slideChecked: !current.slideChecked,
      };
      this.save();
    },

    setWeakStudySet(questionIds: string[]) {
      this.weakStudySet = Array.from(new Set([...this.weakStudySet, ...questionIds]));
      this.save();
    },

    exportJSON(): string {
      return JSON.stringify(
        {
          version: '1.0',
          exportedAt: new Date().toISOString(),
          progressMap: this.progressMap,
          weakStudySet: this.weakStudySet,
        },
        null,
        2
      );
    },

    importJSON(jsonString: string): boolean {
      try {
        const parsed = JSON.parse(jsonString);
        if (parsed.progressMap) {
          this.progressMap = parsed.progressMap;
          this.weakStudySet = parsed.weakStudySet || [];
          this.save();
          return true;
        }
      } catch (e) {
        console.error('Invalid JSON file', e);
      }
      return false;
    },

    resetAll() {
      this.progressMap = {};
      this.weakStudySet = [];
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});
