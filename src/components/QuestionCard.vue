<template>
  <div class="question-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-4 sm:p-6 transition-all">
    <!-- Header tags: Question number, Topic, Type, Slide check warning -->
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
          Câu {{ question.number }}
        </span>
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" :class="topicBadgeClass(question.topic)">
          {{ topicName(question.topic) }}
        </span>
        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {{ typeName(question.type) }}
        </span>
      </div>

      <!-- Slide Check Warning Badge -->
      <div class="flex items-center gap-2">
        <span
          v-if="question.needsSlideCheck && !userProgress.slideChecked"
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-pulse"
          title="Câu lý thuyết cần đối chiếu với slide của giảng viên"
        >
          ⚠️ Cần đối chiếu slide
        </span>
        <span
          v-else-if="userProgress.slideChecked"
          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
        >
          ✓ Đã đối chiếu slide
        </span>

        <router-link
          :to="{ name: 'Editor', query: { q: question.id } }"
          class="p-1.5 text-xs text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Sửa đáp án trong Answer Editor"
        >
          ✏️ Sửa
        </router-link>
      </div>
    </div>

    <!-- 1. Đề bài gốc (hoặc biến thể số ngẫu nhiên) -->
    <div class="mb-5">
      <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
        <FormulaView :formula="activePrompt" />
      </h3>

      <!-- Figure image if question has one -->
      <div v-if="question.figure" class="mt-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col items-center">
        <img
          :src="question.figure"
          :alt="'Hình minh họa câu ' + question.number"
          class="max-h-72 rounded-lg object-contain shadow-sm bg-white dark:bg-slate-800 p-2"
        />
        <span class="text-xs text-slate-400 mt-1">Hình minh họa đề gốc câu {{ question.number }}</span>
      </div>
    </div>

    <!-- Toggle Answer / Details Button -->
    <div class="mb-5">
      <button
        @click="showAnswer = !showAnswer"
        class="w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
        :class="showAnswer ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' : 'bg-brand-600 text-white hover:bg-brand-700 active:scale-95'"
      >
        <span>{{ showAnswer ? 'Ẩn lời giải' : '👁️ Xem đáp án & giải thích' }}</span>
      </button>
    </div>

    <!-- ANSWER & EXPLANATION SECTION -->
    <div v-if="showAnswer" class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
      <!-- Đáp án chuẩn hoặc đáp án đã sửa -->
      <div class="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Đáp án ngắn
          </span>
          <span v-if="userProgress.customAnswer" class="text-xs px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100 font-semibold">
            Đã chỉnh sửa
          </span>
        </div>
        <div class="text-sm sm:text-base font-semibold text-emerald-950 dark:text-emerald-100">
          <FormulaView :formula="activeAnswer" />
        </div>
      </div>

      <!-- 2. "Hiểu nhanh trong 30 giây" (ELI5) -->
      <div v-if="question.eli5" class="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60">
        <div class="flex items-start gap-2.5">
          <span class="text-lg">💡</span>
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1">
              Hiểu nhanh trong 30 giây (như cho người mới)
            </h4>
            <p class="text-sm text-amber-950 dark:text-amber-100/90 leading-relaxed">
              {{ question.eli5 }}
            </p>
          </div>
        </div>
      </div>

      <!-- 3 & 4. Ví dụ giải từng bước (steps) nếu có -->
      <div v-if="activeSteps && activeSteps.length > 0" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
          <span>📝</span> Các bước giải chi tiết:
        </h4>
        <ol class="space-y-2 text-sm text-slate-700 dark:text-slate-200 pl-1">
          <li v-for="(step, idx) in activeSteps" :key="idx" class="flex items-start gap-2">
            <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 text-xs font-bold shrink-0 mt-0.5">
              {{ idx + 1 }}
            </span>
            <div class="flex-1">
              <FormulaView :formula="step" />
            </div>
          </li>
        </ol>
      </div>

      <!-- Giải thích chi tiết -->
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
          Giải thích chuyên sâu:
        </h4>
        <FormulaView :formula="activeExplanation" />
      </div>

      <!-- 5. Lỗi hay mắc -->
      <div v-if="question.commonMistakes && question.commonMistakes.length > 0" class="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50">
        <h4 class="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-1.5 flex items-center gap-1">
          <span>⚠️</span> Lỗi hay gặp cần tránh:
        </h4>
        <ul class="list-disc list-inside space-y-1 text-xs sm:text-sm text-rose-950 dark:text-rose-200">
          <li v-for="(mistake, idx) in question.commonMistakes" :key="idx">
            {{ mistake }}
          </li>
        </ul>
      </div>

      <!-- 6. Nút "Thử lại với số khác" (nếu có generator) -->
      <div v-if="hasGenerator" class="pt-2">
        <button
          @click="generateNewVariant"
          class="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>🎲 Thử lại với số khác (sinh đề mới)</span>
        </button>
      </div>

      <!-- 7. Nút tự đánh giá Leitner: Nhớ / Mơ hồ / Quên -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span>Hộp Leitner: <b>Hộp {{ userProgress.box }}</b></span>
          <span>•</span>
          <span>Đúng {{ userProgress.correctCount }} / Sai {{ userProgress.wrongCount }}</span>
        </div>

        <div class="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            @click="rate('bad')"
            class="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 active:scale-95 transition-all"
            title="Quên: Đưa về Hộp 1 để ôn mỗi ngày"
          >
            ❌ Quên (Về Hộp 1)
          </button>
          <button
            @click="rate('unsure')"
            class="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 hover:bg-amber-200 active:scale-95 transition-all"
            title="Mơ hồ: Giữ nguyên hộp hiện tại"
          >
            🤔 Mơ hồ
          </button>
          <button
            @click="rate('good')"
            class="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 active:scale-95 transition-all"
            title="Thuộc: Lên 1 hộp tiếp theo"
          >
            ✅ Đã nhớ (Lên hộp)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Question, UserProgress } from '../types';
import FormulaView from './FormulaView.vue';
import { useProgressStore } from '../stores/progress';
import * as generators from '../lib/generators';

const props = defineProps<{
  question: Question;
}>();

const progressStore = useProgressStore();
const showAnswer = ref(false);

const userProgress = computed<UserProgress>(() => {
  return progressStore.getProgress(props.question.id);
});

// Generated variant state
const variant = ref<{
  prompt: string;
  answer: string;
  steps: string[];
} | null>(null);

const hasGenerator = computed(() => {
  return !!props.question.generatorId && props.question.generatorId in generators;
});

function generateNewVariant() {
  if (!props.question.generatorId) return;
  const genFn = (generators as any)[props.question.generatorId];
  if (typeof genFn === 'function') {
    variant.value = genFn();
    showAnswer.value = true;
  }
}

const activePrompt = computed(() => {
  return variant.value ? variant.value.prompt : props.question.prompt;
});

const activeAnswer = computed(() => {
  if (variant.value) return variant.value.answer;
  return userProgress.value.customAnswer || props.question.answer;
});

const activeExplanation = computed(() => {
  return userProgress.value.customExplanation || props.question.explanation;
});

const activeSteps = computed(() => {
  if (variant.value) return variant.value.steps;
  return props.question.steps;
});

function rate(rating: 'good' | 'unsure' | 'bad') {
  progressStore.rateQuestion(props.question.id, rating);
}

function topicName(topic: string): string {
  const map: Record<string, string> = {
    'modern-dw': 'Modern DW',
    entropy: 'Entropy & InfoGain',
    normalization: 'Chuẩn hóa dữ liệu',
    binning: 'Rời rạc hóa (Binning)',
    pca: 'Giảm chiều PCA',
    'time-series': 'Chuỗi thời gian (SMA)',
    'association-rules': 'Luật kết hợp',
    'fp-growth': 'FP-Growth',
    pagerank: 'PageRank',
    cpt: 'Dự đoán chuỗi (CPT)',
    'graph-search': 'BFS & DFS',
    'blockchain-ai': 'Blockchain & AI Act',
  };
  return map[topic] || topic;
}

function topicBadgeClass(topic: string): string {
  const map: Record<string, string> = {
    'modern-dw': 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
    entropy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
    normalization: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200',
    binning: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200',
    pca: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
    'time-series': 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
    'association-rules': 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
    'fp-growth': 'bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-200',
    pagerank: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
    cpt: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200',
    'graph-search': 'bg-lime-100 text-lime-800 dark:bg-lime-900/60 dark:text-lime-200',
    'blockchain-ai': 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200',
  };
  return map[topic] || 'bg-slate-100 text-slate-800';
}

function typeName(type: string): string {
  const map: Record<string, string> = {
    theory: 'Lý thuyết',
    calculation: 'Tính toán',
    formula: 'Công thức',
    diagram: 'Sơ đồ/Đồ thị',
  };
  return map[type] || type;
}
</script>
