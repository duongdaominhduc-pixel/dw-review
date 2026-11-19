<template>
  <div class="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
    <!-- Step indicator -->
    <div class="flex items-center gap-2">
      <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Bước:</span>
      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
        {{ currentStep + 1 }} / {{ Math.max(1, totalSteps) }}
      </span>
    </div>

    <!-- Control Buttons -->
    <div class="flex items-center gap-1.5 sm:gap-2">
      <button
        @click="$emit('reset')"
        class="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
        title="Bắt đầu lại từ đầu"
      >
        ↺ Đặt lại
      </button>

      <button
        @click="$emit('prev')"
        :disabled="currentStep <= 0"
        class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 active:scale-95 transition-all"
      >
        ← Lùi
      </button>

      <button
        @click="$emit('next')"
        :disabled="currentStep >= totalSteps - 1"
        class="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-600 text-white shadow-sm hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
      >
        Bước tiếp →
      </button>

      <button
        @click="$emit('run-all')"
        :disabled="currentStep >= totalSteps - 1"
        class="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
      >
        ▶ Chạy hết
      </button>
    </div>

    <!-- Practice Mode Toggle -->
    <div v-if="hasPracticeMode" class="flex items-center gap-2">
      <button
        @click="$emit('toggle-mode')"
        class="text-xs px-2.5 py-1 rounded-lg border transition-all"
        :class="isPracticeMode ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300 font-semibold' : 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300'"
      >
        {{ isPracticeMode ? '✍️ Chế độ Tự làm' : '📖 Chế độ Hướng dẫn' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: number;
  totalSteps: number;
  hasPracticeMode?: boolean;
  isPracticeMode?: boolean;
}>();

defineEmits<{
  (e: 'prev'): void;
  (e: 'next'): void;
  (e: 'reset'): void;
  (e: 'run-all'): void;
  (e: 'toggle-mode'): void;
}>();
</script>
