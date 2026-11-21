<template>
  <div class="space-y-6">
    <!-- Hero Banner -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 text-white shadow-lg relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div class="relative z-10 max-w-2xl">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md mb-3">
          🎓 Cứu cánh ôn thi • Dành cho người mất gốc
        </span>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Ôn tập Nhà kho Dữ liệu & Tích hợp
        </h1>
        <p class="text-brand-100 text-sm sm:text-base leading-relaxed">
          Nắm chắc 40 câu hỏi trọng tâm (kèm các câu con), giải thích dễ hiểu, trực quan hóa từng bước và ghi nhớ lâu bằng phương pháp lặp lại ngắt quãng Leitner.
        </p>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <router-link
            :to="{ name: 'Flashcards', query: { filter: 'due' } }"
            class="px-5 py-2.5 rounded-xl font-bold text-sm bg-white text-brand-700 shadow-md hover:bg-brand-50 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>⚡ Ôn ngay {{ progressStore.dueQuestions.length }} thẻ hôm nay</span>
          </router-link>
          <router-link
            :to="{ name: 'Exam' }"
            class="px-5 py-2.5 rounded-xl font-bold text-sm bg-brand-500/40 hover:bg-brand-500/60 text-white border border-white/20 backdrop-blur-md active:scale-95 transition-all flex items-center gap-2"
          >
            <span>📝 Thi thử 10/20/40 câu</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Cần ôn hôm nay</div>
        <div class="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400">
          {{ progressStore.dueQuestions.length }}
        </div>
        <div class="text-[11px] text-slate-400 mt-0.5">theo thuật toán Leitner</div>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Đã nhớ vững (Hộp 3+)</div>
        <div class="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
          {{ progressStore.learnedCount }} / {{ progressStore.totalQuestions }}
        </div>
        <div class="text-[11px] text-slate-400 mt-0.5">đã qua ít nhất 3 vòng ôn</div>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Bộ ôn chỗ yếu</div>
        <div class="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
          {{ progressStore.weakQuestions.length }}
        </div>
        <div class="text-[11px] text-slate-400 mt-0.5">câu làm sai hoặc đánh dấu quên</div>
      </div>

      <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Cần đối chiếu slide</div>
        <div class="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
          {{ pendingSlideCheckCount }}
        </div>
        <div class="text-[11px] text-slate-400 mt-0.5">câu lý thuyết cần xem lại slide</div>
      </div>
    </div>

    <!-- Leitner 5-Box Distribution -->
    <div class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            📦 Tiến độ ghi nhớ theo 5 Hộp Leitner
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Hộp 1 (mỗi ngày) → Hộp 2 (2 ngày) → Hộp 3 (4 ngày) → Hộp 4 (8 ngày) → Hộp 5 (16 ngày)
          </p>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-2 sm:gap-3">
        <div
          v-for="b in 5"
          :key="b"
          class="p-3 rounded-xl border text-center transition-all"
          :class="b === 1 ? 'bg-rose-50/70 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50' : b <= 3 ? 'bg-amber-50/70 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50' : 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50'"
        >
          <div class="text-xs font-bold text-slate-600 dark:text-slate-300">
            Hộp {{ b }}
          </div>
          <div class="text-xl sm:text-2xl font-black my-1" :class="b === 1 ? 'text-rose-600 dark:text-rose-400' : b <= 3 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'">
            {{ progressStore.boxCounts[b as 1|2|3|4|5] }}
          </div>
          <div class="text-[10px] text-slate-400">
            {{ b === 1 ? '1 ngày' : b === 2 ? '2 ngày' : b === 3 ? '4 ngày' : b === 4 ? '8 ngày' : '16 ngày' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Hub (6 Main Modules) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <router-link
        :to="{ name: 'Learn' }"
        class="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/60 shadow-sm hover:shadow-md transition-all"
      >
        <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
          📖
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          M1 & M2: Ngân hàng 40 câu (Learn Mode)
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Đầy đủ 40 câu hỏi đề cương kèm giải thích ELI5, ví dụ từng bước, lỗi hay gặp và nút sinh số ngẫu nhiên để luyện tập.
        </p>
      </router-link>

      <router-link
        :to="{ name: 'Flashcards' }"
        class="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/60 shadow-sm hover:shadow-md transition-all"
      >
        <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
          🗂️
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          M3: Flashcards & Lặp lại ngắt quãng
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Lật thẻ 2 mặt, tự đánh giá Nhớ / Mơ hồ / Quên theo 5 hộp Leitner để ôn đúng câu sắp quên.
        </p>
      </router-link>

      <router-link
        :to="{ name: 'Exam' }"
        class="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/60 shadow-sm hover:shadow-md transition-all"
      >
        <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/60 dark:text-purple-300 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
          📝
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          M4: Thi thử & Luyện đề (Exam Mode)
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Chọn 10, 20 hoặc 40 câu; làm trắc nghiệm & điền số; bấm giờ tuỳ chọn, chấm điểm và tự gom câu sai vào bộ ôn chỗ yếu.
        </p>
      </router-link>

      <router-link
        :to="{ name: 'Chapters' }"
        class="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/60 shadow-sm hover:shadow-md transition-all"
      >
        <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-300 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
          📚
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          M8: Khung Chương học (Chapter Study)
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Cấu trúc 9 chương chuẩn hóa theo Slide bài giảng (TS. Nguyễn Thôn Dã), chia nhỏ Bài &gt; Phần, có bài mẫu hoàn thiện và tích hợp bài kiểm tra nhỏ.
        </p>
      </router-link>

      <router-link
        :to="{ name: 'Editor' }"
        class="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/60 shadow-sm hover:shadow-md transition-all"
      >
        <div class="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-300 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
          ✏️
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          M7: Trình sửa đáp án (Answer Editor)
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Tự do chỉnh sửa đáp án lý thuyết theo slide của thầy/cô, đánh dấu 'Đã đối chiếu' và lưu lại an toàn trên máy.
        </p>
      </router-link>

      <router-link
        :to="{ name: 'Backup' }"
        class="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/60 shadow-sm hover:shadow-md transition-all"
      >
        <div class="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-900/60 dark:text-cyan-300 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
          💾
        </div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          Xuất / Nhập Tiến độ (JSON)
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Tải file tiến độ về máy tính hoặc chuyển sang điện thoại mà không lo mất dữ liệu học tập.
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProgressStore } from '../stores/progress';
import questionsData from '../data/questions.json';

const progressStore = useProgressStore();

const pendingSlideCheckCount = computed(() => {
  return questionsData.filter(q => {
    if (!q.needsSlideCheck) return false;
    const p = progressStore.getProgress(q.id);
    return !p.slideChecked;
  }).length;
});
</script>
