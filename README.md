# Web Ôn Tập "Nhà Kho Dữ Liệu và Tích Hợp" (DW Study)

> Ứng dụng web học tập và ôn thi cấp tốc 40 câu hỏi trọng tâm (kèm các câu hỏi con 28a–f, 31a–b) môn **Nhà kho Dữ liệu và Tích hợp**, thiết kế đặc thù cho sinh viên mất gốc theo phương pháp: **Hiểu (ELI5) → Nhớ (Leitner Flashcards) → Tự làm (Random Generator) → Kiểm tra (Exam Mode) → Ôn lại chỗ yếu**.

---

## 1. Công nghệ sử dụng
- **Core:** Vue 3 (Composition API, `<script setup>`) + TypeScript strict
- **Build tool:** Vite (Cấu hình base relative deploy tĩnh không lỗi)
- **Router:** Vue Router 4 (chế độ hash mode `#` hỗ trợ deploy static hosting mọi nền tảng)
- **State Management:** Pinia (Lưu trữ tiến độ học tập vào `localStorage`)
- **Styling & Theme:** Tailwind CSS (Hỗ trợ Dark mode theo hệ thống & chuyển đổi thủ công, thiết kế Mobile-first chuẩn 375px)
- **Toán học & Công thức:** KaTeX (Hiển thị công thức Entropy, Info_A, PageRank, Leverage...)
- **Kiểm thử đơn vị:** Vitest (100% test vectors ở Phụ lục B đều pass)

---

## 2. Hướng dẫn cài đặt và chạy ứng dụng

### 2.1 Yêu cầu môi trường
- Node.js version 18+ trở lên
- Trình quản lý gói `npm` (hoặc `pnpm`, `yarn`)

### 2.2 Các bước chạy
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy môi trường phát triển (Dev Server)
npm run dev

# 3. Chạy toàn bộ Unit Tests (29 tests)
npm run test

# 4. Kiểm tra kiểu TypeScript và build ứng dụng đóng gói tĩnh
npm run build
```

Sau khi chạy `npm run dev`, mở trình duyệt truy cập đường dẫn hiển thị trên terminal (mặc định là `http://localhost:5173/`).

---

## 3. Các tính năng chính (Giai đoạn MVP)

1. **M1 Question Bank & M2 Learn Mode (`#/learn`):**
   - Đầy đủ 47 câu hỏi (40 câu gốc và các câu con 28a-f, 31a-b).
   - Mỗi câu gồm: Đề bài, Đáp án ngắn, Giải thích chuyên sâu, **"Hiểu nhanh trong 30 giây" (ELI5)**, Các bước giải chi tiết, Lỗi hay gặp cần tránh.
   - Nút **"Thử lại với số khác"**: Sinh đề bài ngẫu nhiên kèm lời giải tự động cho mọi câu tính toán.
   - Nhãn cảnh báo **"⚠️ Cần đối chiếu slide"** cho các câu lý thuyết.

2. **M3 Flashcards & Spaced Repetition (`#/flashcards`):**
   - Lật thẻ 2 mặt xem đề bài và đáp án.
   - Tự chấm 3 mức độ theo thuật toán Leitner 5 hộp:
     - ❌ **Quên:** Đưa về Hộp 1 (ôn mỗi ngày).
     - 🤔 **Mơ hồ:** Giữ nguyên hộp hiện tại.
     - ✅ **Đã nhớ:** Lên 1 hộp tiếp theo (chu kỳ: 1, 2, 4, 8, 16 ngày).
   - Phím tắt tiện lợi: `Phím cách (Space)` để lật thẻ, phím `1`, `2`, `3` để chấm, mũi tên `← / →` để chuyển thẻ.
   - Bộ lọc thẻ: *Thẻ đến hạn hôm nay*, *Bộ ôn chỗ yếu*, hoặc *Tất cả 40 câu*.

3. **M4 Quiz / Exam Mode (`#/exam`):**
   - Lựa chọn đề thi: 10, 20, 40 câu hoặc "Bộ ôn chỗ yếu".
   - Tùy chọn bấm giờ: Không giới hạn, 15 phút, 30 phút, 45 phút.
   - Hai chế độ linh hoạt:
     - **Luyện tập:** Hiện ngay đáp án đúng/sai và lời giải từng bước sau khi chọn.
     - **Thi thử:** Làm trọn vẹn rồi mới nộp bài tính điểm.
   - Câu lý thuyết tạo trắc nghiệm 4 đáp án với đáp án nhiễu lấy từ các câu cùng chủ đề.
   - Câu tính toán điền số cho phép sai số nhỏ ($\pm 0.005$) hoặc phân số tương đương.
   - Tự động gom các câu làm sai vào **"Bộ ôn chỗ yếu"**.

4. **M7 Answer Editor (`#/editor`):**
   - Cho phép người dùng chỉnh sửa đáp án ngắn (`customAnswer`) và giải thích (`customExplanation`) theo slide hoặc ý giảng viên.
   - Đánh dấu **"✓ Đã đối chiếu slide bài giảng"**.
   - Hỗ trợ khôi phục về đáp án gốc bất kỳ lúc nào.

5. **M8 Khung Chapter Study (`#/chapters`):**
   - Điều hướng: Danh sách chương (8 chương) → Chương → Bài → Phần.
   - Bài mẫu hoàn thiện: **Bài 1.1: Kiến trúc Modern Data Warehouse và Data Fabric** (chứa Mục tiêu tích chọn được, Khái niệm, Ví dụ thực tế, Ghi chú, Mini Quiz và câu hỏi liên quan).
   - Các bài còn lại ở trạng thái chuẩn bị `empty` (Chưa có nội dung).
   - Sẵn sàng thành phần `LabShell` và `StepControls` cho giai đoạn bổ sung Calculator Labs.

6. **Sao lưu & Khôi phục (`#/backup`):**
   - Xuất toàn bộ tiến độ và đáp án tự sửa ra file `dw_progress_backup_YYYY-MM-DD.json`.
   - Nhập lại file JSON trên thiết bị khác hoặc dán trực tiếp chuỗi văn bản.

---

## 4. Hướng dẫn mở rộng nội dung

Dữ liệu nội dung được tách biệt hoàn toàn khỏi mã nguồn logic. **Thêm hoặc sửa nội dung không cần phải can thiệp vào code Vue/TypeScript.**

### 4.1 Thêm hoặc sửa câu hỏi vào `src/data/questions.json`
Mỗi câu hỏi tuân thủ schema:
```json
{
  "id": "q41",
  "number": "41",
  "chapterId": "ch1",
  "topic": "modern-dw",
  "type": "theory",
  "prompt": "Đề bài câu hỏi...",
  "answer": "Đáp án ngắn gọn...",
  "explanation": "Giải thích chi tiết...",
  "eli5": "Giải thích đơn giản như cho người mới...",
  "steps": ["Bước 1...", "Bước 2..."],
  "commonMistakes": ["Lỗi thường gặp..."],
  "needsSlideCheck": true,
  "generatorId": "generateEntropy",
  "figure": "figures/ten_file_anh.png"
}
```

### 4.2 Thêm bài học vào `src/data/chapters.json`
Thêm một object bài học vào mảng `lessons` của chương tương ứng:
```json
{
  "id": "les-2-1",
  "title": "Bài 1: Micro-partitioning",
  "status": "done",
  "sections": [
    {
      "kind": "objectives",
      "items": ["Mục tiêu 1", "Mục tiêu 2"]
    },
    {
      "kind": "concept",
      "markdown": "Nội dung lý thuyết..."
    },
    {
      "kind": "example",
      "markdown": "Ví dụ thực tế..."
    },
    {
      "kind": "note",
      "markdown": "> [!NOTE]\nGhi chú quan trọng..."
    }
  ],
  "miniQuiz": ["q6", "q7"],
  "relatedQuestionIds": ["q6", "q7"],
  "labIds": []
}
```

---

## 5. Hướng dẫn Deploy Static Site

Vì ứng dụng được thiết kế không backend, chạy trên trình duyệt với Vue Router hash mode (`/#/`), bạn có thể deploy tĩnh miễn phí lên bất kỳ nền tảng nào:

### 5.1 Vercel / Netlify
1. Đẩy mã nguồn lên GitHub.
2. Kết nối repo với **Vercel** hoặc **Netlify**.
3. Cấu hình build:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 5.2 GitHub Pages
1. Chạy `npm run build`.
2. Đẩy thư mục `dist` lên nhánh `gh-pages` hoặc dùng GitHub Action tự động deploy.

---

## 6. Danh mục file cấu trúc chính
```
src/
├── data/
│   ├── questions.json       # Ngân hàng 47 câu hỏi chuẩn hóa
│   └── chapters.json        # Cấu trúc 8 chương và bài học
├── lib/
│   ├── entropy.ts           # Hàm tính Entropy, Info_A, InfoGain
│   ├── normalization.ts     # Min-Max, Z-Score, Decimal Scaling
│   ├── binning.ts           # Equal-width, Equal-frequency
│   ├── sma.ts               # Simple Moving Average
│   ├── rules.ts             # Combinations, Support, Confidence, Lift, Leverage
│   ├── fpgrowth.ts          # FP-Tree, FP-Growth, Conditional Pattern Base
│   ├── pagerank.ts          # PageRank từng bước, Damping Factor
│   ├── cpt.ts               # Dự đoán chuỗi Compact Prediction Tree
│   ├── graphSearch.ts       # BFS (Queue) và DFS (Stack)
│   ├── leitner.ts           # Thuật toán lặp lại ngắt quãng 5 hộp
│   ├── generators.ts        # Sinh số ngẫu nhiên cho tất cả câu tính toán
│   └── __tests__/           # 11 test files (29 tests) dùng test vector Phụ lục B
├── stores/
│   ├── progress.ts          # Pinia store lưu tiến độ học vào localStorage
│   └── settings.ts          # Pinia store cấu hình dark mode, theme
├── views/
│   ├── HomeView.vue         # Trang chủ & bảng thống kê
│   ├── LearnView.vue        # Ngân hàng câu hỏi & bộ lọc (M1, M2)
│   ├── FlashcardView.vue    # Lật thẻ Leitner 5 hộp (M3)
│   ├── ExamView.vue         # Thi thử & Luyện đề (M4)
│   ├── EditorView.vue       # Trình sửa đáp án & đối chiếu slide (M7)
│   ├── ChapterStudyView.vue # Khung chương học (M8)
│   └── BackupView.vue       # Xuất/Nhập file JSON tiến độ
├── components/
│   ├── QuestionCard.vue     # Thẻ câu hỏi hiển thị đa tầng
│   ├── FormulaView.vue      # Render KaTeX an toàn
│   ├── LabShell.vue         # Khung phòng thí nghiệm mini
│   └── StepControls.vue     # Bộ điều khiển lùi/tiến từng bước
└── router/
    └── index.ts             # Hash-based Vue Router
```
