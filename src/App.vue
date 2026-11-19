<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors pb-16 sm:pb-0">
    <!-- Top Navbar -->
    <header class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <!-- Brand / Logo -->
        <router-link :to="{ name: 'Home' }" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
            DW
          </div>
          <div>
            <div class="text-sm font-black text-slate-900 dark:text-white leading-tight">
              Kho Dữ Liệu
            </div>
            <div class="text-[10px] font-semibold text-brand-600 dark:text-brand-400 leading-tight">
              Ôn thi cấp tốc
            </div>
          </div>
        </router-link>

        <!-- Desktop Nav Links -->
        <nav class="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300">
          <router-link
            :to="{ name: 'Home' }"
            class="px-3 py-2 rounded-xl transition-all"
            :class="$route.name === 'Home' ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Trang chủ
          </router-link>
          <router-link
            :to="{ name: 'Learn' }"
            class="px-3 py-2 rounded-xl transition-all"
            :class="$route.name === 'Learn' ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Ngân hàng 40 câu
          </router-link>
          <router-link
            :to="{ name: 'Flashcards' }"
            class="px-3 py-2 rounded-xl transition-all relative"
            :class="$route.name === 'Flashcards' ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Flashcards
            <span
              v-if="progressStore.dueQuestions.length > 0"
              class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-brand-600 text-white font-extrabold"
            >
              {{ progressStore.dueQuestions.length }}
            </span>
          </router-link>
          <router-link
            :to="{ name: 'Exam' }"
            class="px-3 py-2 rounded-xl transition-all"
            :class="$route.name === 'Exam' ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Thi thử
          </router-link>
          <router-link
            :to="{ name: 'Chapters' }"
            class="px-3 py-2 rounded-xl transition-all"
            :class="$route.name === 'Chapters' ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Chương học
          </router-link>
          <router-link
            :to="{ name: 'Editor' }"
            class="px-3 py-2 rounded-xl transition-all"
            :class="$route.name === 'Editor' ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Sửa đáp án
          </router-link>
          <router-link
            :to="{ name: 'Backup' }"
            class="px-3 py-2 rounded-xl transition-all"
            :class="$route.name === 'Backup' ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60' : 'hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Sao lưu
          </router-link>
        </nav>

        <!-- Dark Mode Toggle Button -->
        <div class="flex items-center gap-2">
          <button
            @click="settingsStore.toggleDarkMode"
            class="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-sm hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all"
            :title="settingsStore.darkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'"
          >
            {{ settingsStore.darkMode ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-1 max-w-6xl w-full mx-auto px-4 py-5 sm:py-7">
      <router-view />
    </main>

    <!-- Mobile Bottom Navigation Bar (Mobile-first 375px optimized) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
      <router-link
        :to="{ name: 'Home' }"
        class="flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold"
        :class="$route.name === 'Home' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'"
      >
        <span class="text-lg">🏠</span>
        <span>Trang chủ</span>
      </router-link>

      <router-link
        :to="{ name: 'Learn' }"
        class="flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold"
        :class="$route.name === 'Learn' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'"
      >
        <span class="text-lg">📖</span>
        <span>40 câu</span>
      </router-link>

      <router-link
        :to="{ name: 'Flashcards' }"
        class="flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold relative"
        :class="$route.name === 'Flashcards' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'"
      >
        <span class="text-lg">🗂️</span>
        <span>Ôn thẻ</span>
        <span
          v-if="progressStore.dueQuestions.length > 0"
          class="absolute top-0 right-1 w-2 h-2 rounded-full bg-brand-600"
        ></span>
      </router-link>

      <router-link
        :to="{ name: 'Exam' }"
        class="flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold"
        :class="$route.name === 'Exam' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'"
      >
        <span class="text-lg">📝</span>
        <span>Thi thử</span>
      </router-link>

      <router-link
        :to="{ name: 'Editor' }"
        class="flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold"
        :class="$route.name === 'Editor' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'"
      >
        <span class="text-lg">✏️</span>
        <span>Sửa</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <footer class="mt-auto py-6 border-t border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-400">
      <div class="max-w-6xl mx-auto px-4 space-y-1">
        <p>Ứng dụng ôn tập "Nhà kho dữ liệu và tích hợp" • Lưu trữ hoàn toàn trên trình duyệt</p>
        <p class="text-[11px] text-slate-400/80">
          Xây dựng với Vue 3 + TypeScript strict + Pinia + Tailwind CSS + KaTeX
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProgressStore } from './stores/progress';
import { useSettingsStore } from './stores/settings';

const progressStore = useProgressStore();
const settingsStore = useSettingsStore();

onMounted(() => {
  progressStore.init();
  settingsStore.initTheme();
});
</script>
