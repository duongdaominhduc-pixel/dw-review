import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LearnView from '../views/LearnView.vue';
import FlashcardView from '../views/FlashcardView.vue';
import ExamView from '../views/ExamView.vue';
import EditorView from '../views/EditorView.vue';
import ChapterStudyView from '../views/ChapterStudyView.vue';
import BackupView from '../views/BackupView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/learn',
    name: 'Learn',
    component: LearnView,
  },
  {
    path: '/flashcards',
    name: 'Flashcards',
    component: FlashcardView,
  },
  {
    path: '/exam',
    name: 'Exam',
    component: ExamView,
  },
  {
    path: '/editor',
    name: 'Editor',
    component: EditorView,
  },
  {
    path: '/chapters',
    name: 'Chapters',
    component: ChapterStudyView,
  },
  {
    path: '/backup',
    name: 'Backup',
    component: BackupView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
