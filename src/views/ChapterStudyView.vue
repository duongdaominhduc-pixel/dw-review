<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>📚 Khung Chương học (Chapter Study)</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Cấu trúc 8 chương theo đề cương môn học • Điều hướng Chương &gt; Bài &gt; Phần
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs px-2.5 py-1 rounded-lg font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          1 bài mẫu hoàn thiện (Bài 1.1)
        </span>
      </div>
    </div>

    <!-- Chapter Breadcrumbs / Navigation Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        v-for="ch in chapters"
        :key="ch.id"
        @click="selectChapter(ch.id)"
        class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap border transition-all shrink-0"
        :class="activeChapterId === ch.id ? 'bg-brand-600 text-white border-brand-600 shadow-sm' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50'"
      >
        Chương {{ ch.order }}
      </button>
    </div>

    <!-- Chapter Layout: Sidebar Lessons + Lesson Content Area -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <!-- Lessons Sidebar List -->
      <div class="md:col-span-4 space-y-3">
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Danh sách bài học:
          </div>
          <div class="space-y-1.5">
            <button
              v-for="les in activeChapter.lessons"
              :key="les.id"
              @click="activeLessonId = les.id"
              class="w-full text-left p-3 rounded-xl text-xs sm:text-sm font-medium border transition-all flex flex-col gap-1.5"
              :class="activeLessonId === les.id ? 'bg-brand-50 border-brand-300 text-brand-900 dark:bg-brand-950/60 dark:border-brand-800 dark:text-brand-200 ring-2 ring-brand-500/20' : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'"
            >
              <div class="font-bold flex items-center justify-between">
                <span>{{ les.title }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[11px] px-2 py-0.5 rounded-full font-semibold" :class="statusBadgeClass(les.status)">
                  {{ statusName(les.status) }}
                </span>
                <span class="text-[10px] text-slate-400">
                  {{ les.sections.length }} phần
                </span>
              </div>
            </button>
          </div>
        </div>

        <!-- Chapter Objectives Card -->
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            🎯 Mục tiêu chương {{ activeChapter.order }}:
          </h3>
          <ul class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <li v-for="(obj, idx) in activeChapter.objectives" :key="idx" class="flex items-start gap-1.5">
              <span class="text-brand-500 mt-0.5">•</span>
              <span>{{ obj }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Active Lesson Content Body -->
      <div class="md:col-span-8 space-y-6">
        <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <!-- Lesson Header -->
          <div class="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div class="text-xs font-bold text-brand-600 dark:text-brand-400 mb-1">
                {{ activeChapter.title }}
              </div>
              <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {{ activeLesson.title }}
              </h2>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full font-bold" :class="statusBadgeClass(activeLesson.status)">
              {{ statusName(activeLesson.status) }}
            </span>
          </div>

          <!-- Empty Status Placeholder -->
          <div
            v-if="activeLesson.status === 'empty' || activeLesson.sections.length === 0"
            class="p-10 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700"
          >
            <div class="text-4xl mb-2">📋</div>
            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200">
              Bài học này chưa có nội dung chi tiết (Khung MVP)
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Nội dung sẽ được cập nhật vào file <code>src/data/chapters.json</code> mà không cần sửa code. Hãy xem <b>Bài 1: Kiến trúc Modern Data Warehouse</b> để xem cấu trúc mẫu hoàn chỉnh!
            </p>
          </div>

          <!-- Sections Renderer -->
          <div v-else class="space-y-6">
            <div
              v-for="(sec, idx) in activeLesson.sections"
              :key="idx"
              class="space-y-3"
            >
              <!-- Kind: Objectives -->
              <div
                v-if="sec.kind === 'objectives'"
                class="p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/20 border border-brand-200/80 dark:border-brand-800/60"
              >
                <div class="text-xs font-bold uppercase tracking-wider text-brand-900 dark:text-brand-300 mb-2">
                  ✅ Bạn sẽ nắm vững sau bài này:
                </div>
                <div class="space-y-1.5">
                  <label
                    v-for="(item, iIdx) in sec.items"
                    :key="iIdx"
                    class="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    <input type="checkbox" class="rounded text-brand-600 focus:ring-brand-500" />
                    <span>{{ item }}</span>
                  </label>
                </div>
              </div>

              <!-- Kind: Concept -->
              <div
                v-else-if="sec.kind === 'concept'"
                class="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed"
              >
                <div class="whitespace-pre-line text-slate-800 dark:text-slate-200">
                  <FormulaView :formula="sec.markdown" />
                </div>
              </div>

              <!-- Kind: Example -->
              <div
                v-else-if="sec.kind === 'example'"
                class="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100"
              >
                <div class="font-bold mb-1 text-emerald-800 dark:text-emerald-300">
                  💡 Ví dụ minh họa thực tế:
                </div>
                <div class="whitespace-pre-line leading-relaxed">
                  <FormulaView :formula="sec.markdown" />
                </div>
              </div>

              <!-- Kind: Lab Placeholder -->
              <div v-else-if="sec.kind === 'lab'">
                <LabShell
                  :title="'Calculator Lab: ' + sec.labId"
                  subtitle="Phòng thí nghiệm tương tác (sẵn sàng cho giai đoạn v2)"
                  badge="Giai đoạn v2"
                >
                  <div class="p-6 text-center text-slate-500 dark:text-slate-400 text-xs">
                    <div class="text-3xl mb-2">🔬</div>
                    <div>Thành phần Lab <b>{{ sec.labId }}</b> đã chuẩn bị sẵn khung giao diện LabShell và StepControls.</div>
                  </div>
                  <template #controls>
                    <StepControls :currentStep="0" :totalSteps="4" />
                  </template>
                </LabShell>
              </div>

              <!-- Kind: Note -->
              <div
                v-else-if="sec.kind === 'note'"
                class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200"
              >
                <FormulaView :formula="sec.markdown" />
              </div>
            </div>
          </div>

          <!-- Bottom: Mini Quiz & Related Bank Questions -->
          <div
            v-if="activeLesson.relatedQuestionIds && activeLesson.relatedQuestionIds.length > 0"
            class="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3"
          >
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Câu hỏi liên quan trong đề cương 40 câu:
              </h4>
              <router-link
                :to="{ name: 'Learn', query: { topic: activeLessonQuestionTopic } }"
                class="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline"
              >
                Ôn toàn bộ chủ đề này →
              </router-link>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <router-link
                v-for="qid in activeLesson.relatedQuestionIds"
                :key="qid"
                :to="{ name: 'Learn', query: { q: qid } }"
                class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 text-xs font-bold text-center text-slate-700 dark:text-slate-300 transition-all shadow-sm"
              >
                Câu {{ getQuestionNumber(qid) }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import chaptersData from '../data/chapters.json';
import questionsData from '../data/questions.json';
import { Chapter, Lesson, Question } from '../types';
import FormulaView from '../components/FormulaView.vue';
import LabShell from '../components/LabShell.vue';
import StepControls from '../components/StepControls.vue';

const chapters = chaptersData as Chapter[];
const questions = questionsData as Question[];

const activeChapterId = ref(chapters[0].id);

const activeChapter = computed(() => {
  return chapters.find(c => c.id === activeChapterId.value) || chapters[0];
});

const activeLessonId = ref(activeChapter.value.lessons[0]?.id || '');

function selectChapter(chId: string) {
  activeChapterId.value = chId;
  activeLessonId.value = activeChapter.value.lessons[0]?.id || '';
}

const activeLesson = computed<Lesson>(() => {
  return (
    activeChapter.value.lessons.find(l => l.id === activeLessonId.value) ||
    activeChapter.value.lessons[0]
  );
});

const activeLessonQuestionTopic = computed(() => {
  if (!activeLesson.value?.relatedQuestionIds?.length) return '';
  const firstQ = questions.find(q => q.id === activeLesson.value.relatedQuestionIds[0]);
  return firstQ ? firstQ.topic : '';
});

function getQuestionNumber(qid: string): string {
  const q = questions.find(item => item.id === qid);
  return q ? q.number : qid;
}

function statusName(status: string): string {
  const map: Record<string, string> = {
    empty: 'Chưa có nội dung',
    drafting: 'Đang soạn',
    done: 'Hoàn thiện',
    learned: 'Đã học xong',
  };
  return map[status] || status;
}

function statusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    empty: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
    drafting: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
    done: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
    learned: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
  };
  return map[status] || 'bg-slate-100 text-slate-700';
}
</script>
