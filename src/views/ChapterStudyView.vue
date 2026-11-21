<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>📚 Khung Chương học (Chapter Study)</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Học theo từng chương môn học • Điều hướng Chương &gt; Bài &gt; Phần
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span
          class="text-xs px-2.5 py-1 rounded-lg font-bold border"
          :class="['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8'].includes(activeChapterId) ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'"
        >
          {{ activeChapterId === 'ch1' ? 'Chương 1: Hoàn thiện 8/8 bài (Slide 1)' : activeChapterId === 'ch2' ? 'Chương 2: Hoàn thiện 8/8 bài (Slide 2)' : activeChapterId === 'ch3' ? 'Chương 3: Hoàn thiện 8/8 bài (Slide 3)' : activeChapterId === 'ch4' ? 'Chương 4: Hoàn thiện 8/8 bài (Slide 4)' : activeChapterId === 'ch5' ? 'Chương 5: Hoàn thiện 8/8 bài (Slide 5)' : activeChapterId === 'ch6' ? 'Chương 6: Hoàn thiện 8/8 bài (Slide 6)' : activeChapterId === 'ch7' ? 'Chương 7: Hoàn thiện 8/8 bài (Slide 7)' : activeChapterId === 'ch8' ? 'Chương 8: Hoàn thiện 8/8 bài (Slide 8)' : `Chương ${activeChapter.order}: Đang hoàn thiện` }}
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

    <!-- Sub-tabs for Chapter Study: Lessons vs Quiz Mode vs Slide Bank -->
    <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
      <button
        @click="chapterTab = 'lessons'"
        class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
        :class="chapterTab === 'lessons' ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
      >
        <span>📖</span>
        <span>Bài học lý thuyết</span>
      </button>

      <button
        @click="chapterTab = 'quiz'"
        class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
        :class="chapterTab === 'quiz' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'"
      >
        <span>📝</span>
        <span>Làm Quiz trắc nghiệm</span>
        <span class="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-white/20 text-current">
          {{ activeChapterQuestions.length }} câu
        </span>
      </button>

      <button
        v-if="['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8'].includes(activeChapterId)"
        @click="chapterTab = 'slide_questions'"
        class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
        :class="chapterTab === 'slide_questions' ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
      >
        <span>📋</span>
        <span>{{ activeChapterId === 'ch1' ? 'Tra cứu 47 câu Slide 1' : activeChapterId === 'ch2' ? 'Tra cứu 50 câu Slide 2' : activeChapterId === 'ch3' ? 'Tra cứu 50 câu Slide 3' : activeChapterId === 'ch4' ? 'Tra cứu 50 câu Slide 4' : activeChapterId === 'ch5' ? 'Tra cứu 50 câu Slide 5' : activeChapterId === 'ch6' ? 'Tra cứu 50 câu Slide 6' : activeChapterId === 'ch7' ? 'Tra cứu 50 câu Slide 7' : 'Tra cứu 50 câu Slide 8' }}</span>
      </button>
    </div>

    <!-- TAB 1: Lessons Sidebar + Content -->
    <div v-if="chapterTab === 'lessons'" class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
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
        <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 scroll-mt-28">
          <!-- Lesson Header -->
          <div class="pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div class="text-xs font-bold text-brand-600 dark:text-brand-400 mb-1">
                {{ activeChapter.title }}
              </div>
              <h2 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {{ activeLesson.title }}
              </h2>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full font-bold" :class="statusBadgeClass(activeLesson.status)">
              {{ statusName(activeLesson.status) }}
            </span>
          </div>

          <!-- Empty Status Placeholder (For Chapters 2-8 MVP) -->
          <div
            v-if="activeLesson.status === 'empty' || activeLesson.sections.length === 0"
            class="p-10 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700"
          >
            <div class="text-4xl mb-2">📋</div>
            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200">
              Bài học này đang được chuẩn bị nội dung
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Chương 1 đã hoàn thiện đầy đủ 8 bài học theo Slide 1. Hãy bấm sang <b>Chương 1</b> để trải nghiệm đầy đủ!
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

              <!-- Kind: Concept (Using MarkdownView) -->
              <div
                v-else-if="sec.kind === 'concept'"
                class="p-1 text-slate-800 dark:text-slate-200"
              >
                <MarkdownView :content="sec.markdown" />
              </div>

              <!-- Kind: Example (Green Box with MarkdownView) -->
              <div
                v-else-if="sec.kind === 'example'"
                class="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100"
              >
                <div class="font-bold mb-2 text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <span>💡</span>
                  <span>Ví dụ minh họa thực tế:</span>
                </div>
                <MarkdownView :content="sec.markdown" />
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

              <!-- Kind: Note (Amber Box with MarkdownView) -->
              <div
                v-else-if="sec.kind === 'note'"
                class="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-950 dark:text-amber-100"
              >
                <MarkdownView :content="sec.markdown" />
              </div>
            </div>
          </div>

          <!-- Bottom: Mini Quiz & Interactive Practice Questions for this Lesson -->
          <div
            v-if="currentLessonQuestions.length > 0"
            class="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span>🎯</span>
                <span>Câu hỏi ôn tập của bài này ({{ currentLessonQuestions.length }} câu)</span>
              </h3>
              <button
                @click="chapterTab = 'quiz'"
                class="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
              >
                <span>Chuyển sang làm Quiz trắc nghiệm →</span>
              </button>
            </div>

            <div class="space-y-3">
              <div
                v-for="q in currentLessonQuestions"
                :key="q.id"
                class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-3 text-xs sm:text-sm"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="font-black px-2 py-0.5 rounded-lg bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300 text-xs">
                    Câu {{ q.number }}
                  </span>
                  <button
                    @click="toggleQuestionAnswer(q.id)"
                    class="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                  >
                    <span>{{ expandedQuestionIds.has(q.id) ? 'Ẩn đáp án ▴' : 'Xem đáp án & giải thích ▾' }}</span>
                  </button>
                </div>

                <div class="font-bold text-slate-900 dark:text-white leading-relaxed">
                  <FormulaView :formula="q.prompt" />
                </div>

                <div
                  v-if="expandedQuestionIds.has(q.id)"
                  class="pt-3 border-t border-slate-200/80 dark:border-slate-700/80 space-y-2.5 animate-fadeIn"
                >
                  <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100">
                    <span class="font-bold">Đáp án chuẩn: </span>
                    <FormulaView :formula="q.answer" />
                  </div>

                  <div class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                    <span class="font-bold text-slate-900 dark:text-slate-100">Giải thích chi tiết: </span>
                    <FormulaView :formula="q.explanation" />
                  </div>

                  <div v-if="q.eli5" class="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-100">
                    <span class="font-bold">💡 Dễ hiểu cho người mới (ELI5): </span>
                    <span>{{ q.eli5 }}</span>
                  </div>

                  <div v-if="q.commonMistakes && q.commonMistakes.length > 0" class="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-950 dark:text-rose-100">
                    <span class="font-bold">⚠️ Lỗi dễ mắc phải: </span>
                    <span>{{ q.commonMistakes.join('; ') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: Interactive Chapter Quiz Mode -->
    <div v-else-if="chapterTab === 'quiz'">
      <ChapterQuiz
        :chapterTitle="activeChapter.title"
        :questions="activeChapterQuestions"
      />
    </div>

    <!-- TAB 3: Comprehensive Questions List for Slides -->
    <div v-else class="space-y-4">
      <div class="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              🎯 {{ activeChapterId === 'ch1' ? '47 Câu hỏi ôn tập chi tiết trích từ Slide 1' : activeChapterId === 'ch2' ? '50 Câu hỏi ôn tập chi tiết trích từ Slide 2' : activeChapterId === 'ch3' ? '50 Câu hỏi ôn tập chi tiết trích từ Slide 3' : activeChapterId === 'ch4' ? '50 Câu hỏi ôn tập chi tiết trích từ Slide 4' : activeChapterId === 'ch5' ? '50 Câu hỏi ôn tập chi tiết trích từ Slide 5' : activeChapterId === 'ch6' ? '50 Câu hỏi ôn tập chi tiết trích từ Slide 6' : activeChapterId === 'ch7' ? '50 Câu hỏi ôn tập chi tiết trích từ Slide 7' : '50 Câu hỏi ôn tập chi tiết trích từ Slide 8' }}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Phủ kín toàn bộ các slide bài giảng Chương {{ activeChapter.order }} • Giữ nguyên độc lập không ảnh hưởng đề cương 40 câu gốc
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="toggleAllSlideAnswers"
              class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            >
              {{ areAllSlideAnswersExpanded ? 'Ẩn tất cả đáp án' : 'Hiện tất cả đáp án' }}
            </button>
          </div>
        </div>

        <!-- Filter / Search input -->
        <div class="flex flex-wrap gap-2">
          <input
            v-model="slideSearchQuery"
            type="text"
            :placeholder="activeChapterId === 'ch8' ? '🔍 Tìm nhanh câu hỏi slide 8 (Actionable, Object Tables, Embeddings, IVFFLAT, RAG, Hallucination, Text-to-SQL, Kafka, Streaming, Zero Latency, Data Storytelling, Agentic BI...)' : activeChapterId === 'ch7' ? '🔍 Tìm nhanh câu hỏi slide 7 (AI Act, High Risk, Data Lineage, RLS, CLM, Zero-Copy, k-Anonymity, Epsilon, Data Catalog, Bias, HITL, Continuous Auditing...)' : activeChapterId === 'ch6' ? '🔍 Tìm nhanh câu hỏi slide 6 (In-Database ML, CPT+, PageRank, Damping, BigQuery ML, Cortex, Snowpark, Feature Store, MLOps, UDF...)' : activeChapterId === 'ch5' ? '🔍 Tìm nhanh câu hỏi slide 5 (Support, Confidence, Lift, Leverage, Apriori, FP-Growth, C4.5, Naive Bayes, K-Means, DBSCAN...)' : activeChapterId === 'ch4' ? '🔍 Tìm nhanh câu hỏi slide 4 (Accuracy, Z-Score, IQR, Jaccard, SMA, PCA, Binning, Normalization, Entropy...)' : activeChapterId === 'ch3' ? '🔍 Tìm nhanh câu hỏi slide 3 (ELT, CDC, Zero-ETL, Airflow, Snowpipe, dbt, Jinja, Observability...)' : activeChapterId === 'ch2' ? '🔍 Tìm nhanh câu hỏi slide 2 (Kimball, Micro-partitioning, Fact, SCD, Medallion, VARIANT...)' : '🔍 Tìm nhanh câu hỏi slide 1 (RDBMS, Zero-copy, Medallion, S3, Snowflake...)'"
            class="flex-1 min-w-[240px] px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <!-- List of all slide questions -->
        <div class="space-y-3 pt-2">
          <div
            v-for="q in filteredSlideQuestions"
            :key="q.id"
            class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 text-xs sm:text-sm"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-black px-2 py-0.5 rounded-lg bg-brand-600 text-white text-xs">
                Câu {{ q.number }}
              </span>
              <button
                @click="toggleQuestionAnswer(q.id)"
                class="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                {{ expandedQuestionIds.has(q.id) ? 'Ẩn đáp án ▴' : 'Xem đáp án ▾' }}
              </button>
            </div>

            <div class="font-bold text-slate-900 dark:text-white leading-relaxed">
              <FormulaView :formula="q.prompt" />
            </div>

            <div
              v-if="expandedQuestionIds.has(q.id)"
              class="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn"
            >
              <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100">
                <span class="font-bold">Đáp án: </span>
                <FormulaView :formula="q.answer" />
              </div>
              <div class="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                <span class="font-bold text-slate-900 dark:text-slate-100">Giải thích: </span>
                <FormulaView :formula="q.explanation" />
              </div>
              <div v-if="q.eli5" class="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-100">
                <span class="font-bold">💡 ELI5: </span>{{ q.eli5 }}
              </div>
              <div v-if="q.commonMistakes && q.commonMistakes.length > 0" class="p-2.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-100">
                <span class="font-bold">⚠️ Lưu ý: </span>{{ q.commonMistakes.join('; ') }}
              </div>
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
import chapter1QuestionsData from '../data/chapter1Questions.json';
import chapter2QuestionsData from '../data/chapter2Questions.json';
import chapter3QuestionsData from '../data/chapter3Questions.json';
import chapter4QuestionsData from '../data/chapter4Questions.json';
import chapter5QuestionsData from '../data/chapter5Questions.json';
import chapter6QuestionsData from '../data/chapter6Questions.json';
import chapter7QuestionsData from '../data/chapter7Questions.json';
import chapter8QuestionsData from '../data/chapter8Questions.json';
import { Chapter, Lesson, Question } from '../types';
import FormulaView from '../components/FormulaView.vue';
import MarkdownView from '../components/MarkdownView.vue';
import ChapterQuiz from '../components/ChapterQuiz.vue';
import LabShell from '../components/LabShell.vue';
import StepControls from '../components/StepControls.vue';

const chapters = chaptersData as Chapter[];
const originalQuestions = questionsData as Question[];
const chapter1Questions = chapter1QuestionsData as Question[];
const chapter2Questions = chapter2QuestionsData as Question[];
const chapter3Questions = chapter3QuestionsData as Question[];
const chapter4Questions = chapter4QuestionsData as Question[];
const chapter5Questions = chapter5QuestionsData as Question[];
const chapter6Questions = chapter6QuestionsData as Question[];
const chapter7Questions = chapter7QuestionsData as Question[];
const chapter8Questions = chapter8QuestionsData as Question[];

// Combined lookup for questions in lessons
const allQuestionsMap = computed(() => {
  const map = new Map<string, Question>();
  for (const q of originalQuestions) map.set(q.id, q);
  for (const q of chapter1Questions) map.set(q.id, q);
  for (const q of chapter2Questions) map.set(q.id, q);
  for (const q of chapter3Questions) map.set(q.id, q);
  for (const q of chapter4Questions) map.set(q.id, q);
  for (const q of chapter5Questions) map.set(q.id, q);
  for (const q of chapter6Questions) map.set(q.id, q);
  for (const q of chapter7Questions) map.set(q.id, q);
  for (const q of chapter8Questions) map.set(q.id, q);
  return map;
});

const activeChapterId = ref(chapters[0].id);
const chapterTab = ref<'lessons' | 'quiz' | 'slide_questions'>('lessons');
const slideSearchQuery = ref('');
const expandedQuestionIds = ref<Set<string>>(new Set());

const activeChapter = computed(() => {
  return chapters.find(c => c.id === activeChapterId.value) || chapters[0];
});

const activeLessonId = ref(activeChapter.value.lessons[0]?.id || '');

function selectChapter(chId: string) {
  activeChapterId.value = chId;
  activeLessonId.value = activeChapter.value.lessons[0]?.id || '';
  chapterTab.value = 'lessons';
}

const activeLesson = computed<Lesson>(() => {
  return (
    activeChapter.value.lessons.find(l => l.id === activeLessonId.value) ||
    activeChapter.value.lessons[0]
  );
});

// Questions pool for the active chapter (used in Quiz Mode)
const activeChapterQuestions = computed<Question[]>(() => {
  if (activeChapterId.value === 'ch1') {
    // For Chapter 1, combine both the 47 slide questions and relevant outline questions (q1-q5)
    const relatedOutline = originalQuestions.filter(q => q.chapterId === 'ch1');
    return [...chapter1Questions, ...relatedOutline];
  }
  if (activeChapterId.value === 'ch2') {
    // For Chapter 2, combine both the 50 slide questions and relevant outline questions (q6-q10)
    const relatedOutline = originalQuestions.filter(q => q.chapterId === 'ch2');
    return [...chapter2Questions, ...relatedOutline];
  }
  if (activeChapterId.value === 'ch3') {
    // For Chapter 3, combine both the 50 slide questions and relevant outline questions (q11-q15)
    const relatedOutline = originalQuestions.filter(q => q.chapterId === 'ch3');
    return [...chapter3Questions, ...relatedOutline];
  }
  if (activeChapterId.value === 'ch4') {
    // For Chapter 4, combine both the 50 slide questions and relevant outline questions (q16-q26)
    const relatedOutline = originalQuestions.filter(q => q.chapterId === 'ch4');
    return [...chapter4Questions, ...relatedOutline];
  }
  if (activeChapterId.value === 'ch5') {
    // For Chapter 5, combine both the 50 slide questions and relevant outline questions (q27-q30)
    const relatedOutline = originalQuestions.filter(q => q.chapterId === 'ch5');
    return [...chapter5Questions, ...relatedOutline];
  }
  if (activeChapterId.value === 'ch6') {
    // For Chapter 6, combine both the 50 slide questions and relevant outline questions (q31a, q31b, q33b, q34, q40)
    const relatedOutline = originalQuestions.filter(q => q.chapterId === 'ch6');
    return [...chapter6Questions, ...relatedOutline];
  }
  if (activeChapterId.value === 'ch7') {
    // For Chapter 7, combine both the 50 slide questions and relevant outline questions (q37 CLM, q38 AI Act)
    const relatedOutline = originalQuestions.filter(q => ['q37', 'q38'].includes(q.id));
    return [...chapter7Questions, ...relatedOutline];
  }
  if (activeChapterId.value === 'ch8') {
    // For Chapter 8, combine both the 50 slide questions and relevant outline questions (q35 Blockchain, q36 IVFFLAT, q39 Multidimensional)
    const relatedOutline = originalQuestions.filter(q => ['q35', 'q36', 'q39'].includes(q.id));
    return [...chapter8Questions, ...relatedOutline];
  }
  // For other chapters, take questions belonging to that chapter
  return originalQuestions.filter(q => q.chapterId === activeChapterId.value);
});

// Current slide questions pool for Slide Bank Tab
const currentSlideQuestions = computed<Question[]>(() => {
  if (activeChapterId.value === 'ch8') return chapter8Questions;
  if (activeChapterId.value === 'ch7') return chapter7Questions;
  if (activeChapterId.value === 'ch6') return chapter6Questions;
  if (activeChapterId.value === 'ch5') return chapter5Questions;
  if (activeChapterId.value === 'ch4') return chapter4Questions;
  if (activeChapterId.value === 'ch3') return chapter3Questions;
  if (activeChapterId.value === 'ch2') return chapter2Questions;
  return chapter1Questions;
});

// Questions relevant to the currently viewed lesson
const currentLessonQuestions = computed<Question[]>(() => {
  if (!activeLesson.value?.relatedQuestionIds) return [];
  const list: Question[] = [];
  for (const qid of activeLesson.value.relatedQuestionIds) {
    const q = allQuestionsMap.value.get(qid);
    if (q) list.push(q);
  }
  return list;
});

function toggleQuestionAnswer(qid: string) {
  if (expandedQuestionIds.value.has(qid)) {
    expandedQuestionIds.value.delete(qid);
  } else {
    expandedQuestionIds.value.add(qid);
  }
}

const areAllSlideAnswersExpanded = computed(() => {
  return currentSlideQuestions.value.every(q => expandedQuestionIds.value.has(q.id));
});

function toggleAllSlideAnswers() {
  if (areAllSlideAnswersExpanded.value) {
    for (const q of currentSlideQuestions.value) expandedQuestionIds.value.delete(q.id);
  } else {
    for (const q of currentSlideQuestions.value) expandedQuestionIds.value.add(q.id);
  }
}

const filteredSlideQuestions = computed(() => {
  const list = currentSlideQuestions.value;
  if (!slideSearchQuery.value.trim()) return list;
  const q = slideSearchQuery.value.toLowerCase().trim();
  return list.filter(
    item =>
      item.number.toLowerCase().includes(q) ||
      item.prompt.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.explanation.toLowerCase().includes(q)
  );
});

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
