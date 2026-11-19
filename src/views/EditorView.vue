<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>✏️ Trình sửa đáp án (Answer Editor)</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Chỉnh sửa đáp án lý thuyết theo slide của giảng viên & đánh dấu đã đối chiếu
        </p>
      </div>

      <div class="text-xs px-3 py-1.5 rounded-xl font-bold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
        {{ pendingSlideCheckCount }} câu chưa đối chiếu
      </div>
    </div>

    <!-- Question Selector & Filter -->
    <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 shrink-0">
          Chọn câu hỏi:
        </label>
        <select
          v-model="selectedQuestionId"
          class="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option
            v-for="q in allQuestions"
            :key="q.id"
            :value="q.id"
          >
            Câu {{ q.number }}: {{ q.prompt.slice(0, 70) }}... {{ q.needsSlideCheck ? '⚠️' : '' }}
          </option>
        </select>
      </div>

      <!-- Quick Filter Buttons -->
      <div class="flex items-center gap-2 pt-1 text-xs">
        <span class="text-slate-400">Lọc nhanh:</span>
        <button
          @click="filterOnlyNeedsCheck = !filterOnlyNeedsCheck"
          class="px-2.5 py-1 rounded-lg border transition-all"
          :class="filterOnlyNeedsCheck ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300 font-bold' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'"
        >
          ⚠️ Chỉ câu cần đối chiếu slide
        </button>
      </div>
    </div>

    <!-- Editor Form -->
    <div
      v-if="currentQuestion"
      class="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5"
    >
      <!-- Question Info Bar -->
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            Câu {{ currentQuestion.number }}
          </span>
          <span class="text-xs px-2 py-0.5 rounded-full font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            {{ currentQuestion.topic }}
          </span>
        </div>

        <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold">
          <input
            v-model="isSlideChecked"
            type="checkbox"
            class="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
          />
          <span :class="isSlideChecked ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'">
            {{ isSlideChecked ? '✓ Đã đối chiếu slide bài giảng' : 'Chưa đối chiếu slide' }}
          </span>
        </label>
      </div>

      <!-- Question Prompt (Read-only) -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          Đề bài gốc:
        </label>
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-slate-100">
          <FormulaView :formula="currentQuestion.prompt" />
        </div>
      </div>

      <!-- Original Answer reference -->
      <div>
        <div class="flex items-center justify-between mb-1">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-400">
            Đáp án tham khảo gốc:
          </label>
          <button
            @click="copyOriginalAnswer"
            class="text-[11px] text-brand-600 dark:text-brand-400 hover:underline"
          >
            📋 Chép vào ô sửa
          </button>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <FormulaView :formula="currentQuestion.answer" />
        </div>
      </div>

      <!-- Custom Answer Field -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
          Đáp án ngắn của bạn (hiển thị trên thẻ và trắc nghiệm):
        </label>
        <textarea
          v-model="customAnswer"
          rows="3"
          placeholder="Nhập đáp án chuẩn theo slide của giảng viên..."
          class="w-full p-3.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
        ></textarea>
      </div>

      <!-- Custom Explanation Field -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
          Giải thích chi tiết (tùy chọn):
        </label>
        <textarea
          v-model="customExplanation"
          rows="4"
          placeholder="Ghi chú thêm số trang slide, ví dụ hoặc giải thích riêng..."
          class="w-full p-3.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
        ></textarea>
      </div>

      <!-- Save & Reset Actions -->
      <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          @click="resetToDefault"
          class="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
        >
          ↺ Khôi phục đáp án gốc
        </button>

        <button
          @click="saveAnswer"
          class="px-6 py-2.5 text-xs font-bold rounded-xl bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>💾 Lưu thay đổi</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import questionsData from '../data/questions.json';
import { Question } from '../types';
import FormulaView from '../components/FormulaView.vue';
import { useProgressStore } from '../stores/progress';

const route = useRoute();
const progressStore = useProgressStore();

const allQuestions = questionsData as Question[];

const selectedQuestionId = ref(String(route.query.q || allQuestions[0].id));
const filterOnlyNeedsCheck = ref(false);

const customAnswer = ref('');
const customExplanation = ref('');
const isSlideChecked = ref(false);

const currentQuestion = computed(() => {
  return allQuestions.find(q => q.id === selectedQuestionId.value) || allQuestions[0];
});

watch(
  () => currentQuestion.value,
  (q) => {
    if (q) {
      const p = progressStore.getProgress(q.id);
      customAnswer.value = p.customAnswer || q.answer;
      customExplanation.value = p.customExplanation || q.explanation;
      isSlideChecked.value = !!p.slideChecked;
    }
  },
  { immediate: true }
);

function copyOriginalAnswer() {
  if (currentQuestion.value) {
    customAnswer.value = currentQuestion.value.answer;
    customExplanation.value = currentQuestion.value.explanation;
  }
}

function resetToDefault() {
  if (currentQuestion.value && confirm('Bạn có chắc muốn khôi phục lại đáp án gốc?')) {
    customAnswer.value = currentQuestion.value.answer;
    customExplanation.value = currentQuestion.value.explanation;
    isSlideChecked.value = false;
    progressStore.setCustomAnswer(currentQuestion.value.id, '', '');
  }
}

function saveAnswer() {
  if (!currentQuestion.value) return;
  progressStore.setCustomAnswer(
    currentQuestion.value.id,
    customAnswer.value,
    customExplanation.value
  );
  if (isSlideChecked.value !== progressStore.getProgress(currentQuestion.value.id).slideChecked) {
    progressStore.toggleSlideChecked(currentQuestion.value.id);
  }
  alert('Đã lưu thành công đáp án mới!');
}

const pendingSlideCheckCount = computed(() => {
  return allQuestions.filter(q => {
    if (!q.needsSlideCheck) return false;
    const p = progressStore.getProgress(q.id);
    return !p.slideChecked;
  }).length;
});
</script>
