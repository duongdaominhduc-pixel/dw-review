<template>
  <div class="lab-shell rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
    <!-- Header -->
    <div class="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-lg">
          🔬
        </div>
        <div>
          <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {{ title }}
            <span v-if="badge" class="text-xs px-2 py-0.5 rounded-full font-medium bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300">
              {{ badge }}
            </span>
          </h3>
          <p v-if="subtitle" class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {{ subtitle }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- Main Workspace -->
    <div class="p-4 sm:p-6 space-y-6">
      <!-- Input parameter panel (optional) -->
      <div v-if="$slots.inputs" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
        <slot name="inputs"></slot>
      </div>

      <!-- Main visualization slot -->
      <div class="min-h-[200px] flex flex-col justify-center">
        <slot></slot>
      </div>

      <!-- Step explanation -->
      <div v-if="stepExplanation" class="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 text-blue-900 dark:text-blue-200 text-sm leading-relaxed">
        <div class="flex items-start gap-2">
          <span class="text-blue-500 font-bold">💡</span>
          <div>
            <span class="font-semibold text-blue-950 dark:text-blue-100">Giải thích bước này: </span>
            {{ stepExplanation }}
          </div>
        </div>
      </div>

      <!-- Step Controls -->
      <div v-if="showControls">
        <slot name="controls"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    badge?: string;
    stepExplanation?: string;
    showControls?: boolean;
  }>(),
  {
    showControls: true,
  }
);
</script>
