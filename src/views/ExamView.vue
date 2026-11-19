<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- Screen 1: Exam Setup (Khi chưa bắt đầu) -->
    <div
      v-if="!examStarted"
      class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
    >
      <div class="text-center max-w-lg mx-auto">
        <div class="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center text-3xl mx-auto mb-3">
          📝
        </div>
        <h1 class="text-2xl font-black text-slate-900 dark:text-white">
          Thi thử & Luyện đề trắc nghiệm
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Luyện tập trắc nghiệm lý thuyết kèm đáp án nhiễu cùng chủ đề và các bài tập tính toán sinh số ngẫu nhiên
        </p>
      </div>

      <div class="space-y-5 max-w-md mx-auto pt-2">
        <!-- Select Question Count -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
            Số lượng câu hỏi:
          </label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="count in [10, 20, 40]"
              :key="count"
              @click="selectedCount = count"
              class="py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all"
              :class="selectedCount === count ? 'bg-brand-600 text-white border-brand-600 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'"
            >
              {{ count }} câu
            </button>
            <button
              @click="selectedCount = 'weak'"
              :disabled="progressStore.weakQuestions.length === 0"
              class="py-2.5 rounded-xl text-xs font-bold border transition-all disabled:opacity-40"
              :class="selectedCount === 'weak' ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'"
            >
              Chỗ yếu ({{ progressStore.weakQuestions.length }})
            </button>
          </div>
        </div>

        <!-- Select Mode: Practice vs Real Exam -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
            Chế độ làm bài:
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="examMode = 'practice'"
              class="p-3 rounded-xl text-left border transition-all"
              :class="examMode === 'practice' ? 'bg-blue-50 border-blue-500 text-blue-900 dark:bg-blue-950/40 dark:border-blue-600 dark:text-blue-100 ring-2 ring-blue-500/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'"
            >
              <div class="font-bold text-xs sm:text-sm">💡 Luyện tập</div>
              <div class="text-[11px] opacity-80 mt-0.5">Hiện ngay đáp án & lời giải sau mỗi câu</div>
            </button>
            <button
              @click="examMode = 'exam'"
              class="p-3 rounded-xl text-left border transition-all"
              :class="examMode === 'exam' ? 'bg-purple-50 border-purple-500 text-purple-900 dark:bg-purple-950/40 dark:border-purple-600 dark:text-purple-100 ring-2 ring-purple-500/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'"
            >
              <div class="font-bold text-xs sm:text-sm">⏱️ Thi thử</div>
              <div class="text-[11px] opacity-80 mt-0.5">Làm hết rồi mới nộp bài chấm điểm</div>
            </button>
          </div>
        </div>

        <!-- Select Timer -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
            Thời gian làm bài:
          </label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="t in [0, 15, 30, 45]"
              :key="t"
              @click="selectedTimeMinutes = t"
              class="py-2 rounded-xl text-xs font-bold border transition-all"
              :class="selectedTimeMinutes === t ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'"
            >
              {{ t === 0 ? 'Không giới hạn' : t + ' phút' }}
            </button>
          </div>
        </div>

        <!-- Start Button -->
        <button
          @click="startExam"
          class="w-full py-3.5 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 shadow-md hover:opacity-95 active:scale-95 transition-all"
        >
          🚀 Bắt đầu làm bài thi
        </button>
      </div>
    </div>

    <!-- Screen 2: During Exam (Đang làm bài) -->
    <div v-else-if="!examSubmitted" class="space-y-5">
      <!-- Exam Status Bar -->
      <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            Câu {{ currentExamIndex + 1 }} / {{ examQuestions.length }}
          </span>
          <span class="text-xs text-slate-400">
            ({{ currentExamQuestion.options && currentExamQuestion.options.length > 0 ? 'Trắc nghiệm 4 lựa chọn' : 'Điền số/kết quả' }})
          </span>
        </div>

        <!-- Timer if enabled -->
        <div v-if="selectedTimeMinutes > 0" class="flex items-center gap-1.5 text-xs font-bold" :class="remainingSeconds < 180 ? 'text-rose-600 animate-pulse' : 'text-slate-700 dark:text-slate-300'">
          <span>⏱️</span>
          <span>{{ formatTime(remainingSeconds) }}</span>
        </div>

        <!-- Submit Button -->
        <button
          @click="finishExam"
          class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-purple-600 text-white hover:bg-purple-700 active:scale-95 transition-all"
        >
          Nộp bài
        </button>
      </div>

      <!-- Question Card Body -->
      <div class="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <!-- Question Prompt -->
        <div>
          <div class="text-xs font-semibold text-slate-400 mb-1">
            Chủ đề: {{ currentExamQuestion.question.topic }} • Câu gốc #{{ currentExamQuestion.question.number }}
          </div>
          <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            <FormulaView :formula="currentExamQuestion.variantPrompt || currentExamQuestion.question.prompt" />
          </h2>

          <div v-if="currentExamQuestion.question.figure" class="mt-3 flex justify-center">
            <img
              :src="currentExamQuestion.question.figure"
              alt="Hình đề thi"
              class="max-h-56 rounded-xl object-contain shadow-sm border border-slate-100 dark:border-slate-800 p-2 bg-white dark:bg-slate-800"
            />
          </div>
        </div>

        <!-- Multiple Choice Options (for Theory / Formula) -->
        <div v-if="currentExamQuestion.options && currentExamQuestion.options.length > 0" class="space-y-2.5 pt-2">
          <button
            v-for="(option, optIdx) in currentExamQuestion.options"
            :key="optIdx"
            @click="selectOption(option)"
            :disabled="examMode === 'practice' && currentExamQuestion.userAnswer !== undefined"
            class="w-full p-3.5 sm:p-4 rounded-2xl text-left border text-xs sm:text-sm font-medium transition-all flex items-start gap-3"
            :class="getOptionClass(option)"
          >
            <span class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border shrink-0 mt-0.5" :class="currentExamQuestion.userAnswer === option ? 'bg-brand-600 text-white border-brand-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'">
              {{ String.fromCharCode(65 + optIdx) }}
            </span>
            <span class="flex-1 leading-relaxed break-words">
              <FormulaView :formula="option" />
            </span>
          </button>
        </div>

        <!-- Numeric / Text Input (for Calculation) -->
        <div v-else class="space-y-3 pt-2">
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400">
            Nhập kết quả của bạn (chấp nhận số thập phân ví dụ 0.971, phân số 3/8 hoặc đơn vị):
          </label>
          <div class="flex gap-2">
            <input
              v-model="inputAnswer"
              type="text"
              placeholder="Ví dụ: 0.9710, 3/8, 78 USD..."
              @keyup.enter="submitInputAnswer"
              class="flex-1 px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
            />
            <button
              @click="submitInputAnswer"
              class="px-5 py-2.5 text-xs font-bold rounded-xl bg-brand-600 text-white hover:bg-brand-700 active:scale-95 transition-all"
            >
              Xác nhận
            </button>
          </div>
          <div v-if="currentExamQuestion.userAnswer" class="text-xs text-slate-500">
            Đáp án bạn đã điền: <b>{{ currentExamQuestion.userAnswer }}</b>
          </div>
        </div>

        <!-- Practice Mode Instant Feedback -->
        <div
          v-if="examMode === 'practice' && currentExamQuestion.userAnswer !== undefined"
          class="p-4 rounded-2xl border space-y-3"
          :class="currentExamQuestion.isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-100'"
        >
          <div class="flex items-center gap-2 font-bold text-sm">
            <span>{{ currentExamQuestion.isCorrect ? '✅ Chính xác!' : '❌ Chưa chính xác!' }}</span>
          </div>
          <div class="text-xs sm:text-sm">
            <b>Đáp án đúng: </b>
            <FormulaView :formula="currentExamQuestion.variantAnswer || currentExamQuestion.question.answer" />
          </div>
          <div v-if="currentExamQuestion.variantSteps || currentExamQuestion.question.steps" class="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
            <div class="text-xs font-bold mb-1">Các bước giải:</div>
            <ul class="list-decimal list-inside space-y-1 text-xs">
              <li v-for="(s, idx) in (currentExamQuestion.variantSteps || currentExamQuestion.question.steps)" :key="idx">
                <FormulaView :formula="s" />
              </li>
            </ul>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            @click="prevExamQuestion"
            :disabled="currentExamIndex <= 0"
            class="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
          >
            ← Câu trước
          </button>
          <button
            @click="nextExamQuestion"
            :disabled="currentExamIndex >= examQuestions.length - 1"
            class="px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 text-white disabled:opacity-40"
          >
            Câu tiếp theo →
          </button>
        </div>
      </div>
    </div>

    <!-- Screen 3: Exam Results (Sau khi nộp bài) -->
    <div v-else class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div class="text-center max-w-md mx-auto">
        <div class="text-5xl mb-2">{{ scoreGradeEmoji }}</div>
        <h2 class="text-2xl font-black text-slate-900 dark:text-white">
          Kết quả bài thi
        </h2>
        <div class="text-4xl font-black text-brand-600 dark:text-brand-400 my-2">
          {{ examScore.toFixed(1) }} <span class="text-lg text-slate-400 font-normal">/ 10 điểm</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Đúng {{ correctAnswersCount }} trên tổng số {{ examQuestions.length }} câu ({{ Math.round((correctAnswersCount / examQuestions.length) * 100) }}%)
        </p>

        <!-- Add wrong questions to Weak Study Set -->
        <div v-if="wrongQuestionIds.length > 0" class="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Có <b>{{ wrongQuestionIds.length }} câu</b> làm sai trong bài thi này.</span>
          <button
            @click="saveWeakQuestions"
            class="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
          >
            + Thêm vào Bộ ôn chỗ yếu
          </button>
        </div>
      </div>

      <!-- Detailed Question Breakdown -->
      <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h3 class="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Xem lại chi tiết từng câu:
        </h3>

        <div
          v-for="(eq, idx) in examQuestions"
          :key="idx"
          class="p-4 rounded-2xl border text-xs sm:text-sm space-y-2"
          :class="eq.isCorrect ? 'bg-emerald-50/40 border-emerald-200 dark:bg-emerald-950/10 dark:border-emerald-900/60' : 'bg-rose-50/40 border-rose-200 dark:bg-rose-950/10 dark:border-rose-900/60'"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-slate-800 dark:text-slate-200">
              Câu {{ idx + 1 }} (Đề gốc #{{ eq.question.number }}):
            </span>
            <span class="font-bold text-xs px-2 py-0.5 rounded-full" :class="eq.isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'">
              {{ eq.isCorrect ? '✓ Đúng' : '✗ Sai' }}
            </span>
          </div>

          <div class="text-slate-800 dark:text-slate-200">
            <FormulaView :formula="eq.variantPrompt || eq.question.prompt" />
          </div>

          <div class="text-slate-600 dark:text-slate-300">
            Bạn chọn: <b :class="eq.isCorrect ? 'text-emerald-600' : 'text-rose-600'">{{ eq.userAnswer || '(Bỏ trống)' }}</b>
          </div>

          <div v-if="!eq.isCorrect" class="text-emerald-700 dark:text-emerald-300">
            Đáp án chuẩn: <b><FormulaView :formula="eq.variantAnswer || eq.question.answer" /></b>
          </div>

          <div v-if="eq.variantSteps || eq.question.steps" class="text-xs text-slate-500 pt-1">
            <div class="font-bold">Các bước giải:</div>
            <ul class="list-disc list-inside">
              <li v-for="(st, sIdx) in (eq.variantSteps || eq.question.steps)" :key="sIdx">
                <FormulaView :formula="st" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex justify-center gap-3 pt-4">
        <button
          @click="examStarted = false; examSubmitted = false"
          class="px-5 py-2.5 rounded-xl font-bold text-sm bg-brand-600 text-white shadow hover:bg-brand-700"
        >
          Thi lại lần khác
        </button>
        <router-link
          :to="{ name: 'Flashcards', query: { filter: 'weak' } }"
          class="px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          Ôn Flashcards chỗ yếu
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import questionsData from '../data/questions.json';
import { Question, ExamQuestion } from '../types';
import FormulaView from '../components/FormulaView.vue';
import { useProgressStore } from '../stores/progress';
import * as generators from '../lib/generators';

const progressStore = useProgressStore();
const allQuestions = questionsData as Question[];

const selectedCount = ref<number | 'weak'>(10);
const examMode = ref<'practice' | 'exam'>('practice');
const selectedTimeMinutes = ref(0);

const examStarted = ref(false);
const examSubmitted = ref(false);
const currentExamIndex = ref(0);
const inputAnswer = ref('');
const examQuestions = ref<ExamQuestion[]>([]);

const remainingSeconds = ref(0);
let timerInterval: any = null;

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Curated conceptual distractors for formula questions and specific table questions
const SPECIFIC_DISTRACTORS: Record<string, string[]> = {
  q19: [
    'Entropy của tập dữ liệu D (lượng thông tin cần thiết ban đầu Info(D)).',
    'Độ lợi thông tin (Information Gain: Gain(A) = Info(D) - Info_A(D)) của thuộc tính A.',
    'Chỉ số độ tinh khiết Gini Index của tập D theo thuộc tính A.',
  ],
  q20: [
    'Entropy kỳ vọng sau khi phân chia dữ liệu theo thuộc tính A (Info_A(D)).',
    'Độ lợi thông tin thu được Gain(A) sau khi chia tập D.',
    'Chỉ số phân loại ngẫu nhiên Gini Index.',
  ],
  q27: ['30', '12', '64'],
  q28b: ['0.5 (4/8)', '0.25 (2/8)', '0.625 (5/8)'],
  q28c: ['0.75 (3/4)', '0.50 (2/4)', '0.60 (3/5)'],
  q28d: ['0.875', '1.0000', '1.5000'],
  q28e: ['b, c, d, e', 'c, d, e, b', 'c, b, a, d'],
  q28f: ['4', '1', '6'],
  q29: ['{X, Y} và {X, Z}', '{Y, Z} và {X, T}', '{Z, T} và {Y, X}'],
  q30: ['Khoảng 10% – 20%', 'Khoảng 50%', 'Khoảng 0.001%'],
  q32: ['A', 'C', 'D'],
  q40: ['d = 0.5', 'd = 0.15', 'd = 1.0'],
};

function startExam() {
  let sourceQuestions: Question[] = [];
  if (selectedCount.value === 'weak') {
    sourceQuestions = progressStore.weakQuestions as Question[];
    if (sourceQuestions.length === 0) sourceQuestions = allQuestions;
  } else {
    sourceQuestions = allQuestions;
  }

  const shuffledQuestions = shuffle(sourceQuestions);
  const targetCount = typeof selectedCount.value === 'number' ? selectedCount.value : sourceQuestions.length;
  const picked = shuffledQuestions.slice(0, Math.min(targetCount, sourceQuestions.length));

  examQuestions.value = picked.map(q => {
    // If it's a calculation question with a generator, generate dynamic variant
    if (q.generatorId && q.generatorId in generators) {
      const genFn = (generators as any)[q.generatorId];
      const variant = genFn();
      return {
        question: q,
        variantPrompt: variant.prompt,
        variantAnswer: variant.answer,
        variantSteps: variant.steps,
      };
    }

    // Multiple-choice options generation
    let options: string[] = [];

    if (SPECIFIC_DISTRACTORS[q.id]) {
      options = shuffle([q.answer, ...SPECIFIC_DISTRACTORS[q.id]]);
    } else if (q.type === 'theory' || q.type === 'formula') {
      // Pick distractors from the same type (theory / formula)
      const sameTypeQuestions = allQuestions.filter(
        item => item.id !== q.id && (item.type === 'theory' || item.type === 'formula')
      );

      // Prioritize same topic
      const sameTopic = sameTypeQuestions.filter(item => item.topic === q.topic);
      const otherTopic = sameTypeQuestions.filter(item => item.topic !== q.topic);

      const pool = [...sameTopic, ...otherTopic];
      const pickedDistractors = shuffle(pool)
        .slice(0, 3)
        .map(d => d.answer);

      options = shuffle([q.answer, ...pickedDistractors]);
    } else {
      // Pure calculation question without specific distractors -> numeric input box
      options = [];
    }

    return {
      question: q,
      options,
    };
  });

  currentExamIndex.value = 0;
  inputAnswer.value = '';
  examStarted.value = true;
  examSubmitted.value = false;

  if (selectedTimeMinutes.value > 0) {
    remainingSeconds.value = selectedTimeMinutes.value * 60;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      remainingSeconds.value--;
      if (remainingSeconds.value <= 0) {
        clearInterval(timerInterval);
        finishExam();
      }
    }, 1000);
  }
}

const currentExamQuestion = computed(() => {
  return examQuestions.value[currentExamIndex.value] || examQuestions.value[0];
});

function selectOption(option: string) {
  const eq = currentExamQuestion.value;
  eq.userAnswer = option;
  const targetAns = eq.variantAnswer || eq.question.answer;
  eq.isCorrect = checkAnswerMatch(option, targetAns);
}

function submitInputAnswer() {
  if (!inputAnswer.value.trim()) return;
  const eq = currentExamQuestion.value;
  eq.userAnswer = inputAnswer.value.trim();
  const targetAns = eq.variantAnswer || eq.question.answer;
  eq.isCorrect = checkAnswerMatch(inputAnswer.value, targetAns);
}

function checkAnswerMatch(userAns: string, targetAns: string): boolean {
  const cleanU = userAns.toLowerCase().replace(/[,;\s]/g, '');
  const cleanT = targetAns.toLowerCase().replace(/[,;\s]/g, '');

  if (cleanU === cleanT) return true;

  // Extract numerical values
  const numU = parseFloat(userAns.replace(/[^0-9.-]/g, ''));
  const numT = parseFloat(targetAns.replace(/[^0-9.-]/g, ''));

  if (!isNaN(numU) && !isNaN(numT)) {
    // Check tolerance of 0.005 or percentage equivalence
    if (Math.abs(numU - numT) < 0.005) return true;
    if (Math.abs(numU * 100 - numT) < 0.01) return true;
    if (Math.abs(numU - numT * 100) < 0.01) return true;
  }

  // Fraction comparison e.g. 3/8 vs 0.375
  if (userAns.includes('/')) {
    const parts = userAns.split('/');
    const fracVal = parseFloat(parts[0]) / parseFloat(parts[1]);
    if (!isNaN(fracVal) && !isNaN(numT) && Math.abs(fracVal - numT) < 0.005) {
      return true;
    }
  }

  return cleanT.includes(cleanU) || cleanU.includes(cleanT);
}

function getOptionClass(option: string): string {
  const eq = currentExamQuestion.value;
  if (examMode.value === 'practice' && eq.userAnswer !== undefined) {
    const target = eq.variantAnswer || eq.question.answer;
    if (option === target) {
      return 'bg-emerald-50 border-emerald-500 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-600 dark:text-emerald-100 font-bold';
    }
    if (eq.userAnswer === option && !eq.isCorrect) {
      return 'bg-rose-50 border-rose-500 text-rose-950 dark:bg-rose-950/40 dark:border-rose-600 dark:text-rose-100 font-bold';
    }
  }

  if (eq.userAnswer === option) {
    return 'bg-brand-50 border-brand-500 text-brand-900 dark:bg-brand-950/40 dark:border-brand-600 dark:text-brand-100 font-bold';
  }

  return 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800';
}

function prevExamQuestion() {
  if (currentExamIndex.value > 0) {
    currentExamIndex.value--;
    inputAnswer.value = currentExamQuestion.value.userAnswer || '';
  }
}

function nextExamQuestion() {
  if (currentExamIndex.value < examQuestions.value.length - 1) {
    currentExamIndex.value++;
    inputAnswer.value = currentExamQuestion.value.userAnswer || '';
  }
}

function finishExam() {
  if (timerInterval) clearInterval(timerInterval);
  examSubmitted.value = true;
}

const correctAnswersCount = computed(() => {
  return examQuestions.value.filter(eq => eq.isCorrect).length;
});

const examScore = computed(() => {
  if (examQuestions.value.length === 0) return 0;
  return (correctAnswersCount.value / examQuestions.value.length) * 10;
});

const scoreGradeEmoji = computed(() => {
  const score = examScore.value;
  if (score >= 9) return '🏆';
  if (score >= 8) return '🌟';
  if (score >= 6.5) return '👍';
  if (score >= 5) return '💪';
  return '📚';
});

const wrongQuestionIds = computed(() => {
  return examQuestions.value.filter(eq => !eq.isCorrect).map(eq => eq.question.id);
});

function saveWeakQuestions() {
  progressStore.setWeakStudySet(wrongQuestionIds.value);
  alert(`Đã thêm ${wrongQuestionIds.value.length} câu vào Bộ ôn chỗ yếu!`);
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>
