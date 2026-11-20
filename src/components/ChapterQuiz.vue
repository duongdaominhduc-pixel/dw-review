<template>
  <div class="space-y-5">
    <!-- Screen 1: Quiz Setup (Before Start) -->
    <div
      v-if="!quizStarted"
      class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-2xl mx-auto"
    >
      <div class="text-center space-y-2">
        <div class="inline-flex p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-2xl text-brand-600">
          📝
        </div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Quiz trắc nghiệm: {{ chapterTitle }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Củng cố kiến thức với ngân hàng <b>{{ questions.length }} câu hỏi</b> được biên soạn chi tiết theo slide
        </p>
      </div>

      <!-- Option 1: Number of Questions -->
      <div class="space-y-2">
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Số lượng câu hỏi:
        </label>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="count in availableCounts"
            :key="count.value"
            @click="selectedCount = count.value"
            class="py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center"
            :class="selectedCount === count.value ? 'bg-brand-600 text-white border-brand-600 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'"
          >
            {{ count.label }}
          </button>
        </div>
      </div>

      <!-- Option 2: Quiz Mode -->
      <div class="space-y-2">
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Chế độ làm bài:
        </label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            @click="quizMode = 'practice'"
            class="p-3.5 rounded-2xl border text-left transition-all flex flex-col gap-1"
            :class="quizMode === 'practice' ? 'bg-brand-50/70 border-brand-500 text-brand-950 dark:bg-brand-950/40 dark:border-brand-500 dark:text-brand-200 ring-2 ring-brand-500/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'"
          >
            <div class="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
              <span>💡</span>
              <span>Luyện tập</span>
            </div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">
              Hiện ngay đáp án, giải thích chi tiết và ELI5 sau mỗi câu chọn.
            </div>
          </button>

          <button
            @click="quizMode = 'test'"
            class="p-3.5 rounded-2xl border text-left transition-all flex flex-col gap-1"
            :class="quizMode === 'test' ? 'bg-purple-50/70 border-purple-500 text-purple-950 dark:bg-purple-950/40 dark:border-purple-500 dark:text-purple-200 ring-2 ring-purple-500/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'"
          >
            <div class="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
              <span>⏱️</span>
              <span>Kiểm tra</span>
            </div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">
              Làm toàn bộ bài thi rồi mới nộp bài để xem điểm tổng kết.
            </div>
          </button>
        </div>
      </div>

      <!-- Start Button -->
      <button
        @click="startQuiz"
        class="w-full py-3.5 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 shadow-md hover:opacity-95 active:scale-95 transition-all"
      >
        🚀 Bắt đầu làm Quiz
      </button>
    </div>

    <!-- Screen 2: During Quiz -->
    <div
      v-else-if="!quizSubmitted"
      class="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 max-w-3xl mx-auto"
    >
      <!-- Top Status Header -->
      <div class="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-2">
          <span class="text-xs font-black px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            Câu {{ currentIndex + 1 }} / {{ quizQuestions.length }}
          </span>
          <span class="text-[11px] font-semibold text-slate-400">
            {{ quizMode === 'practice' ? '💡 Chế độ Luyện tập' : '⏱️ Chế độ Kiểm tra' }}
          </span>
        </div>

        <button
          @click="finishQuiz"
          class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-purple-600 text-white hover:bg-purple-700 active:scale-95 transition-all"
        >
          Nộp bài
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          class="bg-brand-600 h-full transition-all duration-300"
          :style="{ width: ((currentIndex + 1) / quizQuestions.length) * 100 + '%' }"
        ></div>
      </div>

      <!-- Question Prompt Area -->
      <div class="space-y-4 pt-1">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            Mã câu: {{ currentQuizQuestion.question.number }}
          </span>
        </div>

        <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          <FormulaView :formula="currentQuizQuestion.question.prompt" />
        </h3>

        <!-- Multiple Choice Options -->
        <div class="space-y-2.5 pt-2">
          <button
            v-for="(option, optIdx) in currentQuizQuestion.options"
            :key="optIdx"
            @click="selectOption(option)"
            :disabled="quizMode === 'practice' && currentQuizQuestion.userAnswer !== undefined"
            class="w-full p-3.5 sm:p-4 rounded-2xl text-left border text-xs sm:text-sm font-medium transition-all flex items-start gap-3"
            :class="getOptionClass(option)"
          >
            <span
              class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border shrink-0 mt-0.5"
              :class="getOptionBadgeClass(option, optIdx)"
            >
              {{ String.fromCharCode(65 + optIdx) }}
            </span>
            <span class="flex-1 leading-relaxed break-words">
              <FormulaView :formula="option" />
            </span>
          </button>
        </div>

        <!-- Practice Mode Instant Feedback -->
        <div
          v-if="quizMode === 'practice' && currentQuizQuestion.userAnswer !== undefined"
          class="p-4 sm:p-5 rounded-2xl border space-y-3 animate-fadeIn"
          :class="currentQuizQuestion.isCorrect ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-100' : 'bg-rose-50/70 border-rose-300 text-rose-950 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-100'"
        >
          <div class="flex items-center gap-2 font-bold text-sm">
            <span>{{ currentQuizQuestion.isCorrect ? '✅ Chính xác!' : '❌ Chưa chính xác!' }}</span>
          </div>

          <div v-if="!currentQuizQuestion.isCorrect" class="text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300">
            Đáp án đúng: <FormulaView :formula="currentQuizQuestion.question.answer" />
          </div>

          <div class="text-xs leading-relaxed text-slate-700 dark:text-slate-300 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
            <b>Giải thích chi tiết: </b>
            <FormulaView :formula="currentQuizQuestion.question.explanation" />
          </div>

          <div v-if="currentQuizQuestion.question.eli5" class="text-xs p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 border border-blue-200 dark:border-blue-900">
            <b>💡 ELI5 (Dễ hiểu): </b>{{ currentQuizQuestion.question.eli5 }}
          </div>

          <div v-if="currentQuizQuestion.question.commonMistakes && currentQuizQuestion.question.commonMistakes.length > 0" class="text-xs p-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 border border-rose-200 dark:border-rose-900">
            <b>⚠️ Lưu ý tránh bẫy: </b>{{ currentQuizQuestion.question.commonMistakes.join('; ') }}
          </div>
        </div>
      </div>

      <!-- Bottom Nav Controls -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          @click="prevQuestion"
          :disabled="currentIndex === 0"
          class="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-40"
        >
          ← Câu trước
        </button>

        <button
          v-if="currentIndex < quizQuestions.length - 1"
          @click="nextQuestion"
          class="px-5 py-2 text-xs font-bold rounded-xl bg-brand-600 text-white hover:bg-brand-700 active:scale-95 transition-all"
        >
          Câu tiếp theo →
        </button>

        <button
          v-else
          @click="finishQuiz"
          class="px-5 py-2 text-xs font-bold rounded-xl bg-purple-600 text-white hover:bg-purple-700 active:scale-95 transition-all"
        >
          Xem kết quả 🎉
        </button>
      </div>
    </div>

    <!-- Screen 3: Quiz Results Screen -->
    <div
      v-else
      class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-3xl mx-auto"
    >
      <!-- Score Banner -->
      <div class="text-center space-y-3 py-4">
        <div class="text-5xl">
          {{ scorePercentage >= 80 ? '🏆' : scorePercentage >= 50 ? '🎉' : '💪' }}
        </div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Kết quả Quiz: {{ chapterTitle }}
        </h2>
        <div class="text-3xl sm:text-4xl font-black text-brand-600 dark:text-brand-400">
          {{ correctCount }} / {{ quizQuestions.length }} câu
          <span class="text-base text-slate-400">({{ scorePercentage }}%)</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          {{ resultMessage }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          @click="restartQuiz"
          class="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-brand-600 text-white shadow hover:bg-brand-700 active:scale-95 transition-all"
        >
          🔄 Làm lại đề khác (Xáo trộn mới)
        </button>
        <button
          @click="quizStarted = false; quizSubmitted = false"
          class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
        >
          ⚙️ Đổi số lượng & chế độ
        </button>
      </div>

      <!-- Detailed Breakdown Review -->
      <div class="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">
          Xem lại chi tiết từng câu:
        </h4>

        <div class="space-y-3">
          <div
            v-for="(item, idx) in quizQuestions"
            :key="idx"
            class="p-4 rounded-2xl border text-xs sm:text-sm space-y-2"
            :class="item.isCorrect ? 'bg-emerald-50/40 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800' : 'bg-rose-50/40 border-rose-200 dark:bg-rose-950/20 dark:border-rose-800'"
          >
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-800 dark:text-slate-200">
                Câu {{ idx + 1 }} (Mã: {{ item.question.number }}):
              </span>
              <span
                class="font-black text-[11px] px-2 py-0.5 rounded-full"
                :class="item.isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'"
              >
                {{ item.isCorrect ? '✓ Đúng' : '✗ Sai' }}
              </span>
            </div>

            <div class="font-medium text-slate-900 dark:text-white">
              <FormulaView :formula="item.question.prompt" />
            </div>

            <div class="text-slate-600 dark:text-slate-300">
              Bạn chọn:
              <b :class="item.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                {{ item.userAnswer || '(Bỏ trống)' }}
              </b>
            </div>

            <div v-if="!item.isCorrect" class="text-emerald-700 dark:text-emerald-300 font-bold">
              Đáp án đúng: <FormulaView :formula="item.question.answer" />
            </div>

            <div class="text-slate-500 dark:text-slate-400 text-xs pt-1">
              {{ item.question.explanation }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Question } from '../types';
import FormulaView from './FormulaView.vue';

const props = defineProps<{
  chapterTitle: string;
  questions: Question[];
}>();

const quizStarted = ref(false);
const quizSubmitted = ref(false);
const quizMode = ref<'practice' | 'test'>('practice');
const selectedCount = ref<number | 'all'>(10);
const currentIndex = ref(0);

interface QuizQuestionItem {
  question: Question;
  options: string[];
  userAnswer?: string;
  isCorrect?: boolean;
}

const quizQuestions = ref<QuizQuestionItem[]>([]);

const availableCounts = computed(() => {
  const total = props.questions.length;
  const list: { label: string; value: number | 'all' }[] = [];
  if (total >= 5) list.push({ label: '5 câu', value: 5 });
  if (total >= 10) list.push({ label: '10 câu', value: 10 });
  if (total >= 20) list.push({ label: '20 câu', value: 20 });
  list.push({ label: `Tất cả (${total})`, value: 'all' });
  return list;
});

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz() {
  const source = [...props.questions];
  const shuffledSource = shuffle(source);
  const targetCount = selectedCount.value === 'all' ? source.length : Math.min(selectedCount.value, source.length);
  const picked = shuffledSource.slice(0, targetCount);

  quizQuestions.value = picked.map(q => {
    // Generate 3 distractors from the rest of the question pool
    const others = source.filter(item => item.id !== q.id && item.answer !== q.answer);
    const pickedDistractors = shuffle(others).slice(0, 3).map(item => item.answer);
    const options = shuffle([q.answer, ...pickedDistractors]);

    return {
      question: q,
      options,
    };
  });

  currentIndex.value = 0;
  quizStarted.value = true;
  quizSubmitted.value = false;
}

function restartQuiz() {
  startQuiz();
}

const currentQuizQuestion = computed(() => {
  return quizQuestions.value[currentIndex.value] || quizQuestions.value[0];
});

function selectOption(option: string) {
  const qItem = currentQuizQuestion.value;
  qItem.userAnswer = option;
  const isRight = option.trim().toLowerCase() === qItem.question.answer.trim().toLowerCase();
  qItem.isCorrect = isRight;
}

function nextQuestion() {
  if (currentIndex.value < quizQuestions.value.length - 1) {
    currentIndex.value++;
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function finishQuiz() {
  // Ensure isCorrect is calculated for all
  for (const qItem of quizQuestions.value) {
    if (qItem.userAnswer) {
      qItem.isCorrect = qItem.userAnswer.trim().toLowerCase() === qItem.question.answer.trim().toLowerCase();
    } else {
      qItem.isCorrect = false;
    }
  }
  quizSubmitted.value = true;
}

const correctCount = computed(() => {
  return quizQuestions.value.filter(item => item.isCorrect).length;
});

const scorePercentage = computed(() => {
  if (quizQuestions.value.length === 0) return 0;
  return Math.round((correctCount.value / quizQuestions.value.length) * 100);
});

const resultMessage = computed(() => {
  const pct = scorePercentage.value;
  if (pct === 100) return 'Xuất sắc tuyệt đối! Bạn đã nắm trọn vẹn 100% kiến thức của chương này.';
  if (pct >= 80) return 'Rất tốt! Bạn đã sẵn sàng cho kỳ thi với phần kiến thức của chương này.';
  if (pct >= 50) return 'Khá tốt! Hãy xem lại các câu trả lời sai ở bên dưới để khắc phục lỗ hổng kiến thức.';
  return 'Bạn cần ôn thêm lý thuyết trong các bài học trước khi thi lại nhé!';
});

function getOptionClass(option: string) {
  const qItem = currentQuizQuestion.value;
  const isSelected = qItem.userAnswer === option;

  if (quizMode.value === 'practice' && qItem.userAnswer !== undefined) {
    const isTarget = option.trim().toLowerCase() === qItem.question.answer.trim().toLowerCase();
    if (isTarget) {
      return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold';
    }
    if (isSelected && !isTarget) {
      return 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-100';
    }
    return 'opacity-50 border-slate-200 dark:border-slate-800';
  }

  if (isSelected) {
    return 'bg-brand-50/80 dark:bg-brand-950/60 border-brand-500 text-brand-950 dark:text-brand-200 ring-2 ring-brand-500/20 font-bold';
  }
  return 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';
}

function getOptionBadgeClass(option: string, _idx: number) {
  const qItem = currentQuizQuestion.value;
  const isSelected = qItem.userAnswer === option;

  if (quizMode.value === 'practice' && qItem.userAnswer !== undefined) {
    const isTarget = option.trim().toLowerCase() === qItem.question.answer.trim().toLowerCase();
    if (isTarget) return 'bg-emerald-600 text-white border-emerald-600';
    if (isSelected && !isTarget) return 'bg-rose-600 text-white border-rose-600';
  }

  if (isSelected) {
    return 'bg-brand-600 text-white border-brand-600';
  }
  return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700';
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
