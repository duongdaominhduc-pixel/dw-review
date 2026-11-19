export type QuestionType = 'theory' | 'formula' | 'calculation' | 'diagram';

export interface Question {
  id: string;                 // ví dụ "q16", "q28a"
  number: string;             // số câu trong đề gốc
  chapterId: string;
  topic: string;              // tag chủ đề: modern-dw, entropy, normalization, binning, pca, time-series, association-rules, fp-growth, pagerank, cpt, graph-search, blockchain-ai
  type: QuestionType;
  prompt: string;             // đề bài, hỗ trợ KaTeX
  answer: string;             // đáp án ngắn
  explanation: string;        // giải thích chi tiết (markdown)
  eli5?: string;              // giải thích như cho người mới
  steps?: string[];           // các bước giải
  commonMistakes?: string[];
  needsSlideCheck: boolean;   // true với câu lý thuyết chưa đối chiếu slide
  labId?: string;             // liên kết tới Calculator Lab
  generatorId?: string;       // hàm sinh biến thể số ngẫu nhiên
  figure?: string;            // đường dẫn ảnh/đồ thị nếu có
}

export interface UserProgress {
  questionId: string;
  box: 1 | 2 | 3 | 4 | 5;     // Leitner
  nextReview: string;         // ISO date YYYY-MM-DD
  correctCount: number;
  wrongCount: number;
  lastResult?: 'good' | 'unsure' | 'bad';
  note?: string;
  slideChecked?: boolean;
  customAnswer?: string;      // đáp án người dùng đã sửa
  customExplanation?: string; // giải thích người dùng đã sửa
}

export interface Chapter {
  id: string;
  title: string;
  order: number;
  objectives: string[];
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  status: 'empty' | 'drafting' | 'done' | 'learned';
  sections: Section[];
  miniQuiz: string[];         // id câu hỏi
  relatedQuestionIds: string[];
  labIds: string[];
}

export type Section =
  | { kind: 'objectives'; items: string[] }
  | { kind: 'concept'; markdown: string }
  | { kind: 'example'; markdown: string }
  | { kind: 'lab'; labId: string }
  | { kind: 'note'; markdown: string };

export interface ExamQuestion {
  question: Question;
  variantPrompt?: string;
  variantAnswer?: string;
  variantSteps?: string[];
  options?: string[]; // 4 options for multiple-choice
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface ExamSession {
  id: string;
  timestamp: string;
  totalQuestions: number;
  timeLimitMinutes: number; // 0 means no timer
  elapsedSeconds: number;
  score: number;
  questions: ExamQuestion[];
  completed: boolean;
  weakQuestionIds: string[];
}
