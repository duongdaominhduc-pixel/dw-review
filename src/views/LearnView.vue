<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          📖 Ngân hàng 40 câu hỏi (Learn Mode)
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Xem chi tiết lời giải, giải thích ELI5 cho người mới, ví dụ từng bước và sinh đề mới
        </p>
      </div>

      <div class="text-xs px-3 py-1.5 rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-800">
        Hiển thị: {{ filteredQuestions.length }} / {{ allQuestions.length }} câu
      </div>
    </div>

    <!-- Filters & Search Bar -->
    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
      <!-- Search Input -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 Tìm theo số câu (16, 28a...), từ khóa (entropy, bridge, airflow...)"
          class="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100 placeholder-slate-400"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      </div>

      <!-- Filter chips: Topic, Type, SlideCheck -->
      <div class="flex flex-wrap items-center gap-2 pt-1">
        <!-- Topic selector -->
        <select
          v-model="selectedTopic"
          class="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
        >
          <option value="">Tất cả chủ đề ({{ allQuestions.length }})</option>
          <option value="modern-dw">Modern DW & Cloud</option>
          <option value="entropy">Entropy & InfoGain</option>
          <option value="normalization">Chuẩn hóa dữ liệu</option>
          <option value="binning">Rời rạc hóa (Binning)</option>
          <option value="pca">Giảm chiều PCA</option>
          <option value="time-series">Chuỗi thời gian (SMA)</option>
          <option value="association-rules">Luật kết hợp</option>
          <option value="fp-growth">FP-Growth</option>
          <option value="pagerank">PageRank</option>
          <option value="cpt">Dự đoán chuỗi (CPT)</option>
          <option value="graph-search">BFS & DFS</option>
          <option value="blockchain-ai">Blockchain & AI Act</option>
        </select>

        <!-- Question Type selector -->
        <select
          v-model="selectedType"
          class="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none"
        >
          <option value="">Tất cả dạng câu</option>
          <option value="theory">Lý thuyết</option>
          <option value="calculation">Tính toán</option>
          <option value="formula">Công thức</option>
        </select>

        <!-- Slide check filter button -->
        <button
          @click="onlyNeedsSlideCheck = !onlyNeedsSlideCheck"
          class="text-xs px-3 py-1.5 rounded-lg border transition-all"
          :class="onlyNeedsSlideCheck ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'"
        >
          ⚠️ Chỉ câu cần đối chiếu slide
        </button>

        <!-- Weak questions filter button -->
        <button
          @click="onlyWeak = !onlyWeak"
          class="text-xs px-3 py-1.5 rounded-lg border transition-all"
          :class="onlyWeak ? 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'"
        >
          🎯 Bộ ôn chỗ yếu ({{ progressStore.weakQuestions.length }})
        </button>

        <!-- Reset filters -->
        <button
          v-if="hasActiveFilter"
          @click="resetFilters"
          class="text-xs text-brand-600 dark:text-brand-400 hover:underline px-2"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>

    <!-- Questions List -->
    <div v-if="filteredQuestions.length > 0" class="space-y-4">
      <QuestionCard
        v-for="q in filteredQuestions"
        :key="q.id"
        :question="q"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
    >
      <div class="text-4xl mb-3">🔍</div>
      <h3 class="text-base font-bold text-slate-800 dark:text-slate-200">
        Không tìm thấy câu hỏi phù hợp
      </h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Hãy thử đổi từ khóa tìm kiếm hoặc bấm Xóa bộ lọc
      </p>
      <button
        @click="resetFilters"
        class="mt-4 px-4 py-2 text-xs font-semibold rounded-xl bg-brand-600 text-white"
      >
        Xem tất cả câu hỏi
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import questionsData from '../data/questions.json';
import { Question } from '../types';
import QuestionCard from '../components/QuestionCard.vue';
import { useProgressStore } from '../stores/progress';

const route = useRoute();
const progressStore = useProgressStore();

const allQuestions = questionsData as Question[];

const searchQuery = ref('');
const selectedTopic = ref(String(route.query.topic || ''));
const selectedType = ref('');
const onlyNeedsSlideCheck = ref(false);
const onlyWeak = ref(route.query.filter === 'weak');

const hasActiveFilter = computed(() => {
  return (
    !!searchQuery.value ||
    !!selectedTopic.value ||
    !!selectedType.value ||
    onlyNeedsSlideCheck.value ||
    onlyWeak.value
  );
});

function resetFilters() {
  searchQuery.value = '';
  selectedTopic.value = '';
  selectedType.value = '';
  onlyNeedsSlideCheck.value = false;
  onlyWeak.value = false;
}

const filteredQuestions = computed(() => {
  return allQuestions.filter(q => {
    // Search query
    if (searchQuery.value) {
      const qNum = q.number.toLowerCase();
      const prompt = q.prompt.toLowerCase();
      const ans = q.answer.toLowerCase();
      const term = searchQuery.value.toLowerCase().trim();
      const matchSearch =
        qNum.includes(term) ||
        prompt.includes(term) ||
        ans.includes(term) ||
        q.topic.toLowerCase().includes(term);
      if (!matchSearch) return false;
    }

    // Topic
    if (selectedTopic.value && q.topic !== selectedTopic.value) {
      return false;
    }

    // Type
    if (selectedType.value && q.type !== selectedType.value) {
      return false;
    }

    // Slide check
    if (onlyNeedsSlideCheck.value && !q.needsSlideCheck) {
      return false;
    }

    // Weak
    if (onlyWeak.value) {
      const isWeak = progressStore.weakQuestions.some(wq => wq.id === q.id);
      if (!isWeak) return false;
    }

    return true;
  });
});
</script>
