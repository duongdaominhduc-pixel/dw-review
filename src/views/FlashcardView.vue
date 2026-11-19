<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Header & Deck Selection -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>🗂️ Flashcards Leitner</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Lật thẻ ghi nhớ ngắt quãng • Đánh giá thật lòng để ôn lại đúng hạn
        </p>
      </div>

      <!-- Deck Mode Selector -->
      <div class="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button
          @click="setDeck('due')"
          class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all"
          :class="currentDeck === 'due' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-600 dark:text-slate-400'"
        >
          Đến hạn ({{ progressStore.dueQuestions.length }})
        </button>
        <button
          @click="setDeck('weak')"
          class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all"
          :class="currentDeck === 'weak' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'"
        >
          Chỗ yếu ({{ progressStore.weakQuestions.length }})
        </button>
        <button
          @click="setDeck('all')"
          class="px-3 py-1.5 text-xs font-bold rounded-lg transition-all"
          :class="currentDeck === 'all' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm' : 'text-slate-600 dark:text-slate-400'"
        >
          Tất cả ({{ allQuestions.length }})
        </button>
      </div>
    </div>

    <!-- Active Deck Empty State -->
    <div
      v-if="activeCards.length === 0"
      class="p-10 sm:p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div class="text-5xl mb-3">🎉</div>
      <h2 class="text-xl font-bold text-slate-900 dark:text-white">
        Tuyệt vời! Bạn không còn thẻ nào cần ôn
      </h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
        Tất cả các thẻ trong bộ này đã được ôn đúng lịch. Hãy quay lại vào ngày mai hoặc chọn bộ "Tất cả 40 câu" để ôn thêm!
      </p>
      <div class="mt-6 flex justify-center gap-3">
        <button
          @click="setDeck('all')"
          class="px-5 py-2.5 text-sm font-bold rounded-xl bg-brand-600 text-white shadow hover:bg-brand-700 transition-all"
        >
          Ôn tất cả 40 câu ngay
        </button>
        <router-link
          :to="{ name: 'Home' }"
          class="px-5 py-2.5 text-sm font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          Về trang chủ
        </router-link>
      </div>
    </div>

    <!-- Main Flashcard Container -->
    <div v-else class="space-y-4">
      <!-- Session Progress Bar -->
      <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Thẻ {{ currentIndex + 1 }} / {{ activeCards.length }}</span>
        <span>Hộp hiện tại: <b class="text-slate-800 dark:text-slate-200">Hộp {{ currentProgress.box }}</b></span>
      </div>

      <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          class="bg-brand-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: ((currentIndex + 1) / activeCards.length) * 100 + '%' }"
        ></div>
      </div>

      <!-- Flippable Card Box -->
      <div
        @click="isFlipped = !isFlipped"
        class="min-h-[360px] sm:min-h-[420px] rounded-3xl p-6 sm:p-8 cursor-pointer border shadow-sm transition-all flex flex-col justify-between relative select-none"
        :class="isFlipped ? 'bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 border-emerald-200 dark:border-emerald-800/80 ring-2 ring-emerald-500/20' : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:shadow-md hover:border-brand-400/60'"
      >
        <!-- Card Top Bar -->
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Câu {{ currentQuestion.number }}
            </span>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              {{ currentQuestion.topic }}
            </span>
          </div>

          <span class="text-xs text-slate-400 flex items-center gap-1">
            <span>{{ isFlipped ? '🟢 Mặt sau (Đáp án)' : '🔵 Mặt trước (Đề bài)' }}</span>
            <span class="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Bấm để lật</span>
          </span>
        </div>

        <!-- Card Content (Front vs Back) -->
        <div class="my-auto py-6">
          <!-- FRONT: PROMPT -->
          <div v-if="!isFlipped" class="space-y-4 text-center sm:text-left">
            <div class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
              <FormulaView :formula="currentQuestion.prompt" />
            </div>

            <!-- Figure if present -->
            <div v-if="currentQuestion.figure" class="mt-4 flex justify-center">
              <img
                :src="currentQuestion.figure"
                alt="Hình câu hỏi"
                class="max-h-56 rounded-xl object-contain shadow-sm border border-slate-100 dark:border-slate-800 p-2 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <!-- BACK: ANSWER & ELI5 -->
          <div v-else class="space-y-4">
            <div class="p-4 rounded-2xl bg-emerald-100/60 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100">
              <div class="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-1">
                Đáp án chính xác:
              </div>
              <div class="text-base sm:text-lg font-bold">
                <FormulaView :formula="activeCustomAnswer || currentQuestion.answer" />
              </div>
            </div>

            <div v-if="currentQuestion.eli5" class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 text-xs sm:text-sm text-amber-950 dark:text-amber-100/90 leading-relaxed">
              <span class="font-bold">💡 Hiểu nhanh: </span>{{ currentQuestion.eli5 }}
            </div>

            <div class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-6">
              <FormulaView :formula="currentQuestion.explanation" />
            </div>
          </div>
        </div>

        <!-- Card Bottom Hint -->
        <div class="text-center text-xs text-slate-400">
          <span v-if="!isFlipped">Bấm vào thẻ hoặc phím Cách (Space) để xem đáp án</span>
          <span v-else>Chọn mức độ nhớ bên dưới để chuyển thẻ tiếp theo</span>
        </div>
      </div>

      <!-- Self-rating 3 buttons (Active when flipped or ready) -->
      <div class="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
        <button
          @click="rateAndNext('bad')"
          class="p-3 sm:p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 active:scale-95 transition-all text-center"
        >
          <div class="text-xl sm:text-2xl mb-1">❌</div>
          <div class="text-xs sm:text-sm font-bold">Quên hoàn toàn</div>
          <div class="text-[10px] text-rose-500/80 mt-0.5">Về Hộp 1 (ôn mỗi ngày)</div>
        </button>

        <button
          @click="rateAndNext('unsure')"
          class="p-3 sm:p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300 active:scale-95 transition-all text-center"
        >
          <div class="text-xl sm:text-2xl mb-1">🤔</div>
          <div class="text-xs sm:text-sm font-bold">Còn mơ hồ</div>
          <div class="text-[10px] text-amber-500/80 mt-0.5">Giữ nguyên hộp</div>
        </button>

        <button
          @click="rateAndNext('good')"
          class="p-3 sm:p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 active:scale-95 transition-all text-center"
        >
          <div class="text-xl sm:text-2xl mb-1">✅</div>
          <div class="text-xs sm:text-sm font-bold">Đã nhớ vững</div>
          <div class="text-[10px] text-emerald-500/80 mt-0.5">Lên hộp (giãn ngày)</div>
        </button>
      </div>

      <!-- Navigation Arrows -->
      <div class="flex items-center justify-between pt-2">
        <button
          @click="prevCard"
          :disabled="currentIndex <= 0"
          class="px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
        >
          ← Thẻ trước
        </button>
        <button
          @click="nextCard"
          :disabled="currentIndex >= activeCards.length - 1"
          class="px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
        >
          Thẻ sau →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import questionsData from '../data/questions.json';
import { Question } from '../types';
import FormulaView from '../components/FormulaView.vue';
import { useProgressStore } from '../stores/progress';
import { LeitnerRating } from '../lib/leitner';

const route = useRoute();
const progressStore = useProgressStore();

const allQuestions = questionsData as Question[];

const currentDeck = ref<'due' | 'weak' | 'all'>('due');
if (route.query.filter === 'all') currentDeck.value = 'all';
if (route.query.filter === 'weak') currentDeck.value = 'weak';

const currentIndex = ref(0);
const isFlipped = ref(false);

const activeCards = computed(() => {
  if (currentDeck.value === 'due') {
    const list = progressStore.dueQuestions;
    return list.length > 0 ? (list as Question[]) : allQuestions;
  }
  if (currentDeck.value === 'weak') {
    return progressStore.weakQuestions as Question[];
  }
  return allQuestions;
});

const currentQuestion = computed<Question>(() => {
  return activeCards.value[currentIndex.value] || allQuestions[0];
});

const currentProgress = computed(() => {
  return progressStore.getProgress(currentQuestion.value.id);
});

const activeCustomAnswer = computed(() => {
  return currentProgress.value.customAnswer;
});

function setDeck(mode: 'due' | 'weak' | 'all') {
  currentDeck.value = mode;
  currentIndex.value = 0;
  isFlipped.value = false;
}

function prevCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    isFlipped.value = false;
  }
}

function nextCard() {
  if (currentIndex.value < activeCards.value.length - 1) {
    currentIndex.value++;
    isFlipped.value = false;
  }
}

function rateAndNext(rating: LeitnerRating) {
  progressStore.rateQuestion(currentQuestion.value.id, rating);
  isFlipped.value = false;
  if (currentIndex.value < activeCards.value.length - 1) {
    currentIndex.value++;
  } else {
    // Reached end of deck
    currentIndex.value = 0;
  }
}

// Keyboard shortcuts
function handleKeyDown(e: KeyboardEvent) {
  if (e.code === 'Space') {
    e.preventDefault();
    isFlipped.value = !isFlipped.value;
  } else if (e.key === '1') {
    rateAndNext('bad');
  } else if (e.key === '2') {
    rateAndNext('unsure');
  } else if (e.key === '3') {
    rateAndNext('good');
  } else if (e.key === 'ArrowLeft') {
    prevCard();
  } else if (e.key === 'ArrowRight') {
    nextCard();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
