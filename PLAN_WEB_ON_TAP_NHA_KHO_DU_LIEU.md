# Web ôn tập "Nhà kho dữ liệu và tích hợp": Plan, Input cần chuẩn bị và Prompt cho AI Agent

> File này gồm 3 phần chính: **(1)** chọn công nghệ, **(2)** danh sách input bạn cần chuẩn bị, **(3)** plan chi tiết và **prompt dán thẳng cho AI agent** (Mục 10). Phụ lục A, B là đáp án và test vector để agent dùng làm dữ liệu gốc và viết unit test.

---

## 1. Quyết định công nghệ

### 1.1 So sánh nhanh

| Tiêu chí | **Vue 3** | React | Svelte |
|---|---|---|---|
| Độ dễ học và đọc code (bạn tự sửa sau này) | Rất dễ | Trung bình | Rất dễ |
| Phù hợp widget tương tác (kéo thanh, animation từng bước) | Rất tốt (reactivity tự động) | Tốt (phải quản lý state/effect kỹ) | Rất tốt |
| Hệ sinh thái, tài liệu, thư viện | Lớn | Lớn nhất | Nhỏ hơn |
| Mức độ AI agent viết chuẩn, ít lỗi | Cao | Rất cao | Trung bình |
| Dung lượng bundle | Nhỏ | Trung bình | Nhỏ nhất |

### 1.2 Khuyến nghị: **Vue 3 + Vite + TypeScript**

Lý do chọn: web này có **rất nhiều widget tương tác** (kéo thanh Good/Bad thì đồ thị entropy đổi ngay, bấm "Bước tiếp" thì cây FP-tree dựng thêm một nhánh). Vue 3 Composition API xử lý kiểu "đổi dữ liệu thì giao diện tự cập nhật" ngắn gọn hơn React. Cú pháp file `.vue` (template, script, style tách riêng) dễ đọc với người mới. Vite cho khởi động nhanh và build nhẹ.

React vẫn ổn nếu agent của bạn quen React hơn. Khi đó giữ nguyên mọi thứ khác trong plan và chỉ đổi Pinia thành Zustand, Vue Router thành React Router.

### 1.3 Bộ công cụ cụ thể

| Hạng mục | Chọn | Ghi chú |
|---|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) | |
| Build | Vite | |
| Ngôn ngữ | TypeScript (strict) | Giúp agent ít sai kiểu dữ liệu |
| State | Pinia | Lưu tiến độ học, cấu hình |
| Router | Vue Router | Chế độ hash để deploy tĩnh không lỗi |
| CSS | Tailwind CSS | Hỗ trợ dark mode, mobile-first |
| Công thức toán | KaTeX | Hiển thị Entropy, Info_A, PageRank, Leverage... |
| Vẽ đồ thị, cây, biểu đồ | **SVG viết tay trong component** | Không thêm thư viện nặng; đồ thị PageRank dùng tọa độ cố định |
| Test | Vitest | Unit test cho các hàm tính toán |
| Lint/format | ESLint + Prettier | |
| Lưu trữ | `localStorage` + nút Xuất/Nhập JSON | Không cần backend |
| PWA (giai đoạn sau) | `vite-plugin-pwa` | Dùng offline trên điện thoại |
| Deploy | Static hosting (Vercel, Netlify hoặc GitHub Pages) | Miễn phí |

**Nguyên tắc:** không backend, không đăng nhập, không database. Toàn bộ chạy trên trình duyệt.

---

## 2. Bạn cần chuẩn bị (INPUT cho agent)

### 2.1 Bắt buộc (thiếu là agent phải đoán)

| # | Input | Dùng để làm gì |
|---|---|---|
| 1 | File PDF đề 40 câu (`MotSoCauHoiChanDoanKienThuc.pdf`) | Nguồn câu hỏi gốc |
| 2 | File `FP-Growth_Sol.pdf` | Nguồn giải mẫu cho FP-Growth Stepper |
| 3 | **File markdown này** (đã có Phụ lục A, B) | Đáp án và test vector |
| 4 | **Ảnh gốc, rõ nét** của các hình trong đề: đồ thị PageRank (câu 31), 2 cây CPT (câu 32, 33), bảng giao dịch (câu 28), bảng Conditional Pattern Base (câu 29) | Hình trong đề nhỏ và mờ. Agent cần dữ liệu chuẩn để dựng Lab |
| 5 | **Slide bài giảng** (PDF) của từng chương, hoặc ít nhất slide của các câu lý thuyết 1–15, 30, 35–39 | Đối chiếu đáp án lý thuyết. Đây là input quan trọng nhất, vì đáp án trong Phụ lục A cho các câu này là mình tổng hợp từ kiến thức chung |
| 5b | Danh sách chương theo đề cương môn học | Dựng khung Chapter Study đúng với môn |

### 2.2 Nên có

| # | Input | Ghi chú |
|---|---|---|
| 6 | Hình thức thi (trắc nghiệm, tự luận hay trộn), số câu, thời gian | Để cấu hình Exam Mode giống đề thật |
| 7 | Có được dùng máy tính cầm tay hoặc tra công thức không | Để quyết định hiển thị bảng công thức |
| 8 | Xác nhận các câu mơ hồ với thầy/cô: câu 11 (Snowflake Evolution), 29 (bảng CPB), 33 (hình CPT), 37 (CLM), 39 | Danh sách ở Mục 9 |
| 9 | Ngày thi | Để Dashboard hiện đếm ngược và gợi ý lịch ôn |

### 2.3 Tùy chọn (không có thì agent dùng mặc định)

| Input | Mặc định |
|---|---|
| Ngôn ngữ giao diện | Tiếng Việt (giữ nguyên thuật ngữ tiếng Anh) |
| Màu chủ đạo, logo | Xanh dương trung tính, tự theo sáng/tối của hệ thống |
| Nơi deploy | Netlify hoặc Vercel |
| Có muốn PWA/offline | Làm ở giai đoạn v3 |
| Có muốn đồng bộ nhiều thiết bị | Không (chỉ xuất/nhập file JSON) |

---

## 3. Mục tiêu và nguyên tắc thiết kế

Người dùng **mất gốc**, nên web đi theo vòng: **Hiểu → Nhớ → Tự làm → Kiểm tra → Ôn lại chỗ yếu**.

- **Câu tính toán** (entropy, FP-Growth, PageRank...): có công cụ tương tác để tự thao tác, và đề **sinh số ngẫu nhiên** để không học vẹt đáp án.
- **Câu lý thuyết** (Firebolt, Data Fabric...): flashcard và lặp lại ngắt quãng.
- **Mọi đáp án đều sửa được** trong giao diện, vì nhiều câu lý thuyết cần đối chiếu slide.
- **Mobile-first**, vì người học thường ôn lúc rảnh.
- Giải thích bằng ngôn ngữ đơn giản ("như cho người mới"), luôn kèm ví dụ.

---

## 4. Danh sách module

| # | Module | Mô tả | Giai đoạn |
|---|---|---|---|
| M1 | **Question Bank** | 40 câu lưu bằng JSON, gắn chủ đề, loại, độ khó | MVP |
| M2 | **Learn Mode** | Thẻ học từng câu: giải thích đơn giản, công thức, ví dụ, lỗi hay gặp | MVP |
| M3 | **Flashcards + Spaced Repetition** | Lật thẻ, tự chấm Nhớ / Mơ hồ / Quên, thuật toán Leitner xếp lịch | MVP |
| M4 | **Quiz / Exam Mode** | Trắc nghiệm, điền số; chế độ Luyện tập (có gợi ý) và Thi thử (bấm giờ) | MVP |
| M5 | **Calculator Labs** | Phòng thí nghiệm mini cho câu tính toán (Mục 6) | v2, v3 |
| M6 | **Progress Dashboard** | Tiến độ theo chủ đề, câu hay sai, streak, đếm ngược ngày thi | v2 |
| M7 | **Answer Editor** | Sửa đáp án và giải thích, đánh dấu "đã đối chiếu slide" | MVP |
| M8 | **Chapter Study** | Học sâu từng chương, **chỉ dựng khung**, nội dung làm sau | Khung ở MVP |
| M9 | **Search & Filter** | Tìm kiếm, lọc theo chủ đề, loại, đã thuộc chưa | v3 |

### 4.1 Thẻ câu hỏi trong Learn Mode (thứ tự hiển thị)

1. Đề bài gốc
2. "Hiểu nhanh trong 30 giây" (giải thích đơn giản)
3. Công thức hoặc ý chính
4. Ví dụ giải từng bước
5. Lỗi hay mắc
6. Nút **"Thử lại với số khác"** (câu tính) hoặc **"Tự kiểm tra"** (câu lý thuyết)
7. Nút **"Đã thuộc / Chưa thuộc"** để đẩy vào lịch ôn

### 4.2 Spaced Repetition (Leitner)

- 5 hộp. Hộp 1 ôn mỗi ngày, hộp 2 sau 2 ngày, hộp 3 sau 4 ngày, hộp 4 sau 8 ngày, hộp 5 sau 16 ngày.
- Nhớ: lên 1 hộp. Mơ hồ: giữ nguyên hộp. Quên: về hộp 1.
- Trang chủ hiển thị "Hôm nay cần ôn N thẻ".

### 4.3 Exam Mode

- Chọn 10, 20 hoặc 40 câu; có tùy chọn bấm giờ.
- Câu tính toán dùng generator số ngẫu nhiên; câu lý thuyết tạo trắc nghiệm 4 đáp án với đáp án nhiễu lấy từ các câu cùng chủ đề.
- Sau bài thi: chấm điểm, xem lời giải từng câu, và tự gom câu sai thành **"Bộ ôn chỗ yếu"**.

---

## 5. Mô hình dữ liệu (TypeScript)

```ts
type QuestionType = 'theory' | 'formula' | 'calculation' | 'diagram';

interface Question {
  id: string;                 // ví dụ "q16", "q28a"
  number: string;             // số câu trong đề gốc
  chapterId: string;
  topic: string;              // tag chủ đề (xem Mục 6)
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

interface UserProgress {
  questionId: string;
  box: 1 | 2 | 3 | 4 | 5;     // Leitner
  nextReview: string;         // ISO date
  correctCount: number;
  wrongCount: number;
  lastResult?: 'good' | 'unsure' | 'bad';
  note?: string;
  slideChecked?: boolean;
  customAnswer?: string;      // đáp án người dùng đã sửa
}

interface Chapter {
  id: string;
  title: string;
  order: number;
  objectives: string[];
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  status: 'empty' | 'drafting' | 'done' | 'learned';
  sections: Section[];        // khối nội dung dùng lại được
  miniQuiz: string[];         // id câu hỏi
  relatedQuestionIds: string[];
  labIds: string[];
}

type Section =
  | { kind: 'objectives'; items: string[] }
  | { kind: 'concept'; markdown: string }
  | { kind: 'example'; markdown: string }
  | { kind: 'lab'; labId: string }
  | { kind: 'note'; markdown: string };
```

Dữ liệu câu hỏi nằm trong `src/data/questions.json`, chương nằm trong `src/data/chapters.json`. **Thêm hoặc sửa nội dung không phải đụng code.**

---

## 6. Phân nhóm 40 câu và Calculator Labs

| Nhóm chủ đề (topic) | Câu | Lab tương ứng |
|---|---|---|
| `modern-dw` | 1–15 | Flashcard cặp "thuật ngữ ↔ định nghĩa"; sơ đồ kiến trúc đơn giản (Data Fabric, Mirroring) |
| `entropy` | 16, 19, 20 | **Entropy Lab**: kéo thanh số Good/Bad, đường cong entropy đổi realtime; thêm bước tính Info_A và Information Gain |
| `normalization` | 17, 21, 22 | **Normalization Lab**: nhập dãy số, xem Min-Max, Z-Score, Decimal Scaling cạnh nhau |
| `binning` | 18, 23, 24 | **Binning Lab**: so sánh Equal-width và Equal-frequency, tô màu từng nhóm |
| `pca` | 25 | Minh họa 2D: xoay trục để thấy phương sai lớn nhất |
| `time-series` | 26 | **SMA Lab**: trượt cửa sổ k trên dữ liệu giá dầu |
| `association-rules` | 27, 28a–d, 30 | **Rule Metrics Lab**: chọn X→Y, tự hiện Support, Confidence, Lift, Leverage kèm cách đếm giao dịch tô sáng |
| `fp-growth` | 28e–f, 29 | **FP-Growth Stepper**: đếm → lọc → sắp xếp → dựng cây từng giao dịch → Conditional Pattern Base → tập phổ biến |
| `pagerank` | 31, 40 | **PageRank Stepper**: đồ thị, chạy từng vòng lặp, chỉnh damping factor, hiện công thức thay số |
| `cpt` | 32, 33 | **CPT Predictor**: nhập chuỗi, xem cây, Inverted Index, bảng điểm dự đoán |
| `graph-search` | 33, 34 (BFS, DFS) | **BFS/DFS Animator**: chạy từng bước, hiện queue/stack |
| `blockchain-ai` | 35–39 | Flashcard và thẻ so sánh (ví dụ IVFFLAT và quét toàn bộ) |

**Thứ tự ưu tiên làm Lab:** FP-Growth, PageRank, Rule Metrics, Entropy, CPT trước (khó và dễ ra thi), rồi tới các Lab đơn giản.

**Yêu cầu chung cho mọi Lab:**
- Chạy từng bước (nút "Bước tiếp", "Lùi", "Chạy hết", "Đặt lại").
- Mỗi bước có một câu giải thích ngắn bằng tiếng Việt.
- Có chế độ **"Tự làm"**: người học nhập kết quả của bước, Lab chấm đúng sai trước khi cho xem đáp án.
- Logic tính toán tách khỏi giao diện, nằm trong `src/lib/` dưới dạng hàm thuần (pure function) để viết unit test.

---

## 7. Khung Chapter Study (M8) — chỉ dựng khung

Mục tiêu: dựng đủ cấu trúc, điều hướng, trạng thái để **sau này chỉ cần đổ nội dung vào `chapters.json`**, không sửa code.

**Điều hướng:** Danh sách chương → Chương → Bài → Phần.

**Mỗi bài render từ mảng `sections`** (xem Mục 5): objectives (checklist tích được), concept, example, lab (nhúng Calculator Lab vào giữa bài), note. Cuối bài có mini quiz và danh sách "câu liên quan trong ngân hàng 40 câu".

**Trạng thái bài:** `Chưa có nội dung / Đang soạn / Hoàn thiện / Đã học xong`, hiển thị bằng huy hiệu để biết chương nào còn trống.

**Danh sách chương dự kiến** (bạn chỉnh theo đề cương thật, xem input 5b):
1. Modern Data Warehouse và nền tảng đám mây
2. Mô hình hóa chiều dữ liệu (Fact, Dimension, Bridge, Snowflake)
3. dbt, Jinja, Airflow, quản lý pipeline
4. Tiền xử lý dữ liệu
5. Khai phá luật kết hợp (Apriori, FP-Growth)
6. Khai phá Web và đồ thị (PageRank, BFS/DFS)
7. Dự đoán chuỗi (CPT)
8. Blockchain, vector search, AI Act

Khung chỉ cần: dữ liệu mẫu 1 bài đầy đủ (để chứng minh template chạy) và các bài còn lại ở trạng thái `empty`.

---

## 8. Luồng người dùng, cấu trúc thư mục, lộ trình

### 8.1 Luồng người dùng

```
Trang chủ ─┬─ Ôn theo lịch hôm nay (flashcard đến hạn)
           ├─ Học mới (Learn Mode theo nhóm chủ đề)
           ├─ Phòng Lab (Calculator Labs)
           ├─ Thi thử (Exam Mode)
           ├─ Chương học (Chapter Study)
           └─ Tiến độ (Dashboard)
```

### 8.2 Cấu trúc thư mục gợi ý

```
src/
  data/            questions.json, chapters.json
  lib/             entropy.ts, normalization.ts, binning.ts, sma.ts,
                   rules.ts, fpgrowth.ts, pagerank.ts, cpt.ts, graphSearch.ts,
                   leitner.ts, generators.ts
  lib/__tests__/   unit test cho từng file trên (dùng test vector Phụ lục B)
  stores/          progress.ts, settings.ts
  views/           Home, Learn, Flashcards, Exam, Labs, Chapters, Dashboard, Editor
  components/      QuestionCard, FormulaView (KaTeX), LabShell, StepControls,
                   FpTreeView, GraphView, ChartView, ...
  labs/            EntropyLab.vue, FpGrowthLab.vue, PageRankLab.vue, ...
  router/
```

### 8.3 Lộ trình triển khai

| Giai đoạn | Nội dung | Kết quả |
|---|---|---|
| **MVP (1)** | M1, M2, M3, M4, M7, khung M8, nhập đủ 40 câu | Ôn toàn bộ 40 câu bằng flashcard và quiz |
| **v2 (2)** | 5 Lab ưu tiên (FP-Growth, PageRank, Rule Metrics, Entropy, CPT) và M6 Dashboard | Tự tay làm được mọi dạng bài tính toán |
| **v3 (3)** | Các Lab còn lại, M9, đề thi thử ưu tiên câu yếu, PWA | Ôn chắc, dùng offline |
| **v4 (4)** | Đổ nội dung Chapter Study | Học sâu theo giáo trình |

### 8.4 Tiêu chí nghiệm thu MVP

- [ ] Có đủ 40 câu (kể cả 28a–f, 31a–b), mỗi câu có đáp án và giải thích.
- [ ] Mọi test vector ở Phụ lục B đều pass bằng unit test.
- [ ] Flashcard lật được, chấm 3 mức, lịch Leitner đúng khoảng ngày, dữ liệu còn sau khi tải lại trang.
- [ ] Exam Mode chạy trọn một lượt: chọn số câu, làm bài, chấm điểm, ra Bộ ôn chỗ yếu.
- [ ] Sửa đáp án trong Answer Editor được và lưu lại.
- [ ] Xuất và nhập file JSON tiến độ hoạt động.
- [ ] Dùng tốt trên điện thoại (màn rộng 375 px), có dark mode.
- [ ] Chapter Study hiển thị đúng danh sách chương, 1 bài mẫu đầy đủ, các bài khác ở trạng thái "Chưa có nội dung".
- [ ] `npm run build` không lỗi, `npm run test` pass.

---

## 9. Rủi ro và điểm cần xác nhận

- **Đáp án lý thuyết có thể lệch slide** (câu 1–15, 30, 35–39). Vì vậy có M7 Answer Editor và cờ `needsSlideCheck`. Agent **không được** coi các đáp án đó là chuẩn; phải hiển thị nhãn "Cần đối chiếu slide".
- **Câu 29**: bảng Conditional Pattern Base có số liệu chưa khớp nhau (dòng Y ghi T:3, dòng T ghi Y:4). Cần hỏi lại thầy/cô.
- **Câu 33 (cây CPT thứ hai)**: hình nhỏ, cần ảnh rõ.
- **Câu 11 (Snowflake Evolution)**, **37 (CLM)**, **39 (truy vấn nhiều cấp)**: thuật ngữ mơ hồ, đáp án trong phụ lục là phỏng đoán. Cần đối chiếu slide.
- **Câu 38 (AI Act)**: lịch áp dụng của luật có thể đã điều chỉnh; chỉ ghi phần nguyên tắc phân loại rủi ro, không ghi ngày cụ thể.
- **Đồ thị PageRank (câu 31)**: các cạnh cần xác nhận với ảnh gốc (Phụ lục B ghi bộ cạnh đã đọc từ hình).

---

## 10. PROMPT DÁN CHO AI AGENT

> Copy toàn bộ phần trong khung dưới đây và dán cho agent, kèm theo các file input ở Mục 2.1.

```text
# VAI TRÒ
Bạn là một senior front-end engineer kiêm người thiết kế trải nghiệm học tập. Hãy xây dựng một web app ôn tập kiến thức môn "Nhà kho dữ liệu và tích hợp" cho một sinh viên MẤT GỐC, theo đặc tả bên dưới.

# BỐI CẢNH
- Người dùng cần ôn chắc một đề cương 40 câu hỏi (kèm các câu con 28a-28f, 31a-31b). Có câu lý thuyết (khái niệm) và câu tính toán (entropy, chuẩn hóa, binning, SMA, luật kết hợp, FP-Growth, PageRank, CPT).
- Tôi đính kèm: (1) PDF đề 40 câu, (2) PDF FP-Growth_Sol, (3) file PLAN_WEB_ON_TAP_NHA_KHO_DU_LIEU.md chứa đặc tả đầy đủ, đáp án gốc (Phụ lục A) và test vector (Phụ lục B), (4) ảnh các hình trong đề, (5) slide bài giảng.
- Hãy ĐỌC KỸ file markdown: nó là nguồn sự thật chính cho kiến trúc, mô hình dữ liệu, danh sách module, Lab và tiêu chí nghiệm thu.

# CÔNG NGHỆ (bắt buộc)
Vue 3 (Composition API, <script setup>) + Vite + TypeScript strict + Pinia + Vue Router (hash mode) + Tailwind CSS + KaTeX + Vitest. Vẽ đồ thị, cây, biểu đồ bằng SVG viết tay trong component, KHÔNG thêm thư viện vẽ nặng. Không backend, không đăng nhập; lưu tiến độ trong localStorage và có nút Xuất/Nhập file JSON. Deploy được dưới dạng static site.

# PHẠM VI LẦN NÀY: Giai đoạn MVP (Mục 8.3 của file markdown)
Làm: M1 Question Bank, M2 Learn Mode, M3 Flashcards + Leitner, M4 Quiz/Exam Mode, M7 Answer Editor, khung M8 Chapter Study, và toàn bộ hàm tính toán trong src/lib/ kèm unit test.
KHÔNG làm ở lần này: các Calculator Lab đầy đủ (M5), Dashboard (M6), Search (M9), PWA. Nhưng PHẢI chuẩn bị sẵn thư mục/giao diện LabShell và StepControls để thêm Lab sau không phải sửa kiến trúc.

# QUY TẮC QUAN TRỌNG
1. Toàn bộ nội dung câu hỏi nằm trong src/data/questions.json và src/data/chapters.json, đúng schema ở Mục 5 của file markdown. Thêm/sửa nội dung không được phải đụng code.
2. Nhập đủ 40 câu (kể cả 28a-f, 31a-b) từ Phụ lục A. Mỗi câu phải có: prompt, answer, explanation, eli5, steps (nếu là câu tính), commonMistakes (nếu có), topic, type, needsSlideCheck.
3. Câu lý thuyết 1-15, 30, 35-39 mang cờ needsSlideCheck = true. UI phải hiển thị nhãn "Cần đối chiếu slide" cho các câu này và cho phép người dùng sửa đáp án trong Answer Editor, đánh dấu "đã đối chiếu". KHÔNG được tự ý coi đáp án đó là chuẩn.
4. Nếu slide bài giảng tôi cung cấp mâu thuẫn với Phụ lục A, hãy ƯU TIÊN slide, cập nhật JSON và liệt kê các thay đổi trong báo cáo cuối.
5. Các hàm tính toán (entropy, minmax, zscore, decimal scaling, equal-width, equal-frequency, SMA, support/confidence/lift/leverage, FP-Growth, PageRank, CPT predict, BFS, DFS, Leitner) viết dưới dạng hàm thuần trong src/lib/, KHÔNG dính tới giao diện, và phải có unit test dùng đúng test vector ở Phụ lục B của file markdown. Test không pass thì chưa được coi là xong.
6. Mọi câu tính toán có generator sinh số ngẫu nhiên (generators.ts) để nút "Thử lại với số khác" cho ra đề mới nhưng vẫn có đáp án tính tự động bằng hàm ở src/lib/. Với câu có bước giải, trả về cả mảng các bước.
7. Giao diện bằng TIẾNG VIỆT, giữ nguyên thuật ngữ tiếng Anh. Văn phong giải thích đơn giản, như dạy người mới, luôn có ví dụ cụ thể.
8. Mobile-first (kiểm tra ở chiều rộng 375 px), dark mode theo hệ thống, nút bấm đủ lớn, thao tác một tay được.
9. Công thức hiển thị bằng KaTeX. Đáp án số hiển thị với làm tròn hợp lý (ví dụ 4 chữ số thập phân) kèm dạng phân số nếu có.
10. Chấm câu điền số cho phép sai số nhỏ (ví dụ 0.001) và chấp nhận cả dạng phân số hoặc phần trăm tương đương.
11. Spaced repetition theo Leitner 5 hộp (1, 2, 4, 8, 16 ngày) như Mục 4.2.
12. Exam Mode theo Mục 4.3: chọn 10/20/40 câu, bấm giờ tùy chọn, chấm điểm, xem lời giải, tự gom câu sai thành "Bộ ôn chỗ yếu". Trắc nghiệm câu lý thuyết lấy đáp án nhiễu từ các câu cùng topic.
13. Khung Chapter Study theo Mục 7: render từ mảng sections, có điều hướng Chương > Bài > Phần, huy hiệu trạng thái bài, 1 bài mẫu đầy đủ, các bài còn lại trạng thái "empty". Phần "lab" trong bài hiển thị placeholder khi Lab chưa có.
14. Code sạch, có comment ngắn ở chỗ khó (đặc biệt thuật toán), tên biến rõ nghĩa. Không để lại code chết hoặc TODO mơ hồ.
15. Nếu thiếu input hoặc có mâu thuẫn (hình mờ, bảng số liệu không khớp, thuật ngữ mơ hồ), KHÔNG đoán âm thầm: ghi vào file QUESTIONS_FOR_USER.md rồi làm theo giả định hợp lý nhất và đánh dấu rõ giả định đó trong dữ liệu.

# QUY TRÌNH LÀM VIỆC
Bước 1: Đọc toàn bộ input, tóm tắt lại hiểu biết (tối đa 15 dòng) và liệt kê những gì còn thiếu hoặc mơ hồ.
Bước 2: Khởi tạo dự án, dựng cấu trúc thư mục theo Mục 8.2.
Bước 3: Viết src/lib/ + unit test trước, chạy test cho pass.
Bước 4: Nhập dữ liệu 40 câu vào JSON và kiểm tra schema.
Bước 5: Dựng giao diện theo thứ tự: QuestionCard/Learn Mode → Flashcards + Leitner → Exam Mode → Answer Editor → khung Chapter Study → Xuất/Nhập tiến độ.
Bước 6: Kiểm tra theo Tiêu chí nghiệm thu ở Mục 8.4, chạy npm run build và npm run test.
Bước 7: Viết README ngắn: cách chạy, cách thêm câu hỏi, cách thêm bài vào chương, cách deploy.

# ĐẦU RA MONG MUỐN
- Mã nguồn đầy đủ chạy được bằng `npm install && npm run dev`.
- README.md.
- QUESTIONS_FOR_USER.md (các điểm cần tôi xác nhận).
- Báo cáo cuối: đã làm gì, tiêu chí nghiệm thu nào đạt, giả định nào đã dùng, thay đổi nào so với Phụ lục A do slide.

# PHONG CÁCH GIAO TIẾP
Báo cáo ngắn gọn, đi thẳng vào việc. Nếu một quyết định kỹ thuật không rõ, chọn phương án đơn giản hơn và nói lý do trong một câu.
```

---

## Phụ lục A: Đáp án gốc 40 câu (dữ liệu nguồn cho `questions.json`)

Ký hiệu ⚠️ = câu lý thuyết cần đối chiếu slide (`needsSlideCheck = true`).

### Modern DW và công cụ (câu 1–15)

| Câu | Đáp án ngắn |
|---|---|
| 1 ⚠️ Firebolt | Cloud data warehouse tối ưu **tốc độ**: truy vấn rất nhanh (dưới ~1 giây), tách rời storage và compute, dùng SQL, có index thưa (sparse index) và aggregating index. |
| 2 ⚠️ Tránh tính lại kết quả cũ | **Caching** kết quả truy vấn (liên quan Materialized View). |
| 3 ⚠️ Data Fabric | Kiến trúc kết nối dữ liệu phân tán: tích hợp và truy cập thống nhất, quản trị và bảo mật nhất quán, tự động hóa metadata, self-service, cung cấp dữ liệu nhanh. |
| 4 ⚠️ Data Catalog | Danh mục lưu **metadata** (bảng, cột, chủ sở hữu, nguồn gốc, chất lượng) giúp tìm và hiểu dữ liệu. |
| 5 ⚠️ Bucket Policies | Chính sách JSON gắn vào bucket (ví dụ S3) để **kiểm soát quyền truy cập**. |
| 6 ⚠️ Micro-partitioning | Mỗi micro-partition khoảng **50–500 MB dữ liệu chưa nén** (Snowflake), lưu theo cột. |
| 7 ⚠️ Clustering Key | Chọn theo **các cột hay dùng để lọc (WHERE), JOIN, ORDER BY** để cắt bớt partition khi truy vấn. |
| 8 ⚠️ Accumulating Snapshot | Quy trình nhiều giai đoạn có đầu và cuối (ví dụ xử lý đơn hàng); **một dòng mỗi quy trình**, cập nhật dần qua từng mốc, đo thời gian giữa các giai đoạn. |
| 9 ⚠️ Bridge Table | Giải quyết quan hệ **nhiều-nhiều** giữa fact và dimension; hỗ trợ cấu trúc phân cấp. |
| 10 ⚠️ Flat table | Giảm các phép **JOIN**. |
| 11 ⚠️ Snowflake Evolution | (Phỏng đoán là Schema Evolution) cấu trúc bảng tự thích nghi khi nguồn đổi, tự thêm cột, không cần sửa tay. |
| 12 ⚠️ Schema Tests (dbt) | Kiểm tra chất lượng khai báo trong YAML: `unique`, `not_null`, `accepted_values`, `relationships`. |
| 13 ⚠️ Jinja | Công cụ template của Python; viết SQL động bằng `{{ }}` và `{% %}`; dbt dùng `{{ ref('...') }}`. |
| 14 ⚠️ Apache Airflow | Điều phối workflow bằng code Python dưới dạng **DAG**: lập lịch, quản lý phụ thuộc, retry, giao diện giám sát. |
| 15 ⚠️ Storage Mirroring | Sao chép dữ liệu liên tục sang nơi lưu trữ khác: dự phòng, high availability, disaster recovery, failover; trong Fabric còn đưa dữ liệu từ DB nguồn sang kho phân tích không cần ETL tay. |

### Tiền xử lý dữ liệu và Entropy (câu 16–25)

| Câu | Đáp án ngắn |
|---|---|
| 16 | Entropy(6 Good, 4 Bad) = −0.6·log₂0.6 − 0.4·log₂0.4 ≈ **0.971** |
| 17 | Min-Max: (8−5)/(10−5) = **0.6** |
| 18 | Độ rộng = (700−100)/3 = 200. Nhóm thấp nhất: **100–300 triệu**. |
| 19 | Info_A(D) = Σ (\|Dⱼ\|/\|D\|)·Info(Dⱼ): entropy kỳ vọng sau khi chia D theo thuộc tính A. v = số phân vùng, Dⱼ = tập con j, \|Dⱼ\|/\|D\| = trọng số, Info(Dⱼ) = entropy của tập con. Gain(A) = Info(D) − Info_A(D). |
| 20 | Info(D) = −Σ pᵢ·log₂(pᵢ): entropy của D. m = số lớp, pᵢ = xác suất mẫu thuộc lớp i. |
| 21 | Z-Score: v' = (v−μ)/σ; kết quả có trung bình 0, độ lệch chuẩn 1; ít nhạy ngoại lai hơn Min-Max. |
| 22 | Decimal Scaling: v' = v/10ʲ, j nhỏ nhất sao cho max\|v'\| < 1 (ví dụ 986 → 0.986, j = 3). |
| 23 | Equal-frequency Binning: mỗi nhóm có **số phần tử bằng nhau**. |
| 24 | Discretization: chuyển dữ liệu liên tục thành khoảng/nhãn rời rạc (Equal-width, Equal-frequency là hai cách làm). |
| 25 | PCA: giảm chiều; tìm các trục mới vuông góc giữ nhiều phương sai nhất, bỏ các thành phần ít thông tin. |

### SMA và luật kết hợp (câu 26–30)

| Câu | Đáp án ngắn |
|---|---|
| 26 | SMA ngày 4, k = 3 = (78+76+80)/3 = **78 USD** |
| 27 | C(6,2) = **15** |
| 28a | Leverage = 3/8 − (7/8)(3/8) = 3/64 ≈ **0.0469** |
| 28b | Sup = 3/8 = **0.375** |
| 28c | Conf = 3/7 ≈ **0.4286** |
| 28d | Lift = (3/7)/(3/8) = 8/7 ≈ **1.1429** |
| 28e | Với Minsup = 4: đếm a=2, b=4, c=7, d=4, e=4. Bỏ a. Sắp giảm dần: **c, b, d, e** (b, d, e bằng nhau nên hoán đổi thứ tự được). |
| 28f | Sup({c,d,b}) = **2** (giao dịch 2 và 6), tức 2/8 = 0.25 |
| 29 | Minsup = 4, không chứa X: **{Y,Z}** và **{Y,T}** (⚠️ bảng đề có số liệu chưa khớp) |
| 30 ⚠️ | Thường chọn minsup khoảng **1%–5%** |

### PageRank (câu 31, 40)

| Câu | Đáp án ngắn |
|---|---|
| 31a | PR(2) = 0.15 + 0.85·(1/1 + 1/4) = **1.2125** |
| 31b | PR(1) = 0.15 + 0.85·(1/4) = **0.3625** |
| 40 | Damping factor thường dùng **d = 0.85** |

(Nếu đề dùng PageRank không damping thì 31a = 1.25 và 31b = 0.25. Cần hỏi thầy/cô.)

### CPT (câu 32, 33)

| Câu | Đáp án ngắn |
|---|---|
| 32 | Chuỗi trong cây: s1 = A,B,C,D,F; s2 = D,C,B,E; s3 = E,A,D,C,B; s4 = E,G,A,D,B,C. Dự đoán cho ⟨D,C⟩: phần đứng sau D và C là s1:{F}, s2:{B,E}, s3:{B}, s4:{}. B xuất hiện 2 lần ⇒ đáp án **B**. |
| 33 ⚠️ | CPT gồm Prediction Tree (cây nén tiền tố chung), Inverted Index (item nằm trong chuỗi nào), Lookup Table (mỗi chuỗi s trỏ tới nút cuối trong cây). Trong hình: x = AB; s1 = A,B,C; s2 = A,B; s3 = A,B,D,C; s4 = B,C; s5 = E,A,B,A. Ưu điểm: tiết kiệm bộ nhớ, tìm nhanh chuỗi giống. |

### Duyệt đồ thị, Blockchain, AI (câu 33b–39)

Đề đánh số lặp "33" hai lần. Quy ước ID: câu CPT là `q33`, câu BFS là `q33b`.

| Câu | Đáp án ngắn |
|---|---|
| 33b ⚠️ BFS | Duyệt theo chiều rộng, từng tầng; dùng **queue**; tìm đường đi ngắn nhất (theo số cạnh) trong đồ thị không trọng số. |
| 34 ⚠️ DFS | Duyệt theo chiều sâu, đi hết nhánh rồi quay lui; dùng **stack** hoặc đệ quy; tốn ít bộ nhớ; hợp phát hiện chu trình, sắp xếp topo. |
| 35 ⚠️ Blockchain dữ liệu thô | Các **khối** mã hóa nhị phân/hex nối nhau bằng hash, chứa giao dịch và log sự kiện; không ở dạng bảng quan hệ nên phải giải mã và ETL trước khi phân tích. |
| 36 ⚠️ IVFFLAT | Index tìm kiếm vector gần đúng: gom vector thành cụm bằng k-means, truy vấn chỉ tìm trong vài cụm gần nhất (`probes`); "Flat" = lưu vector nguyên, không nén; nhanh hơn quét toàn bộ nhưng chỉ gần đúng. |
| 37 ⚠️ CLM | (Phỏng đoán) Causal Language Modeling: dự đoán từ kế tiếp dựa trên các từ trước (kiểu GPT), khác Masked LM (kiểu BERT). Cần xác nhận với slide. |
| 38 ⚠️ AI Act | Đạo luật AI của EU, quản lý theo mức rủi ro: không chấp nhận được (cấm), cao (tuân thủ nghiêm), hạn chế (minh bạch), tối thiểu. Không ghi ngày áp dụng cụ thể. |
| 39 ⚠️ Truy vấn nhiều cấp | (Phỏng đoán) Khai phá dữ liệu đa cấp/đa chiều gắn với OLAP: drill-down, roll-up theo các mức khái niệm; thường là luật kết hợp đa cấp. Cần xác nhận với slide. |

---

## Phụ lục B: Test vector cho unit test (`src/lib/__tests__/`)

Dùng `toBeCloseTo` cho số thực (sai số 4 chữ số thập phân).

**Entropy**
- `entropy([6, 4])` → 0.9710
- `entropy([5, 5])` → 1
- `entropy([10, 0])` → 0

**Chuẩn hóa và binning**
- `minMax(8, min=5, max=10)` → 0.6
- `decimalScaling([986, 12, 45])` → [0.986, 0.012, 0.045]
- `equalWidthBins(min=100, max=700, k=3)` → [[100,300],[300,500],[500,700]]
- Equal-frequency: 12 giá trị đã sắp xếp chia k=3 → mỗi nhóm đúng 4 phần tử.

**SMA**
- Giá: [75, 78, 76, 80, 82, 81], k = 3 → SMA ngày 4 = 78, ngày 3 = 76.3333, ngày 5 = 79.3333, ngày 6 = 81.

**Tổ hợp**
- `pairsFromFrequentItems(6)` → 15

**Luật kết hợp** (8 giao dịch: {a,b,c}, {a,b,c,d,e}, {b}, {c,d,e}, {c}, {b,c,d}, {c,d,e}, {c,e})
- `support({c})` = 7/8; `support({d,e})` = 3/8; `support({c,d,e})` = 3/8
- Luật {c} → {d,e}: support = 0.375, confidence = 0.4286, lift = 1.1429, leverage = 0.046875
- `supportCount({c,d,b})` = 2

**FP-Growth** (cùng 8 giao dịch, minsup = 4)
- Đếm: a=2, b=4, c=7, d=4, e=4
- Sau lọc và sắp xếp: c đứng đầu, bỏ a; giao dịch 2 sau sắp xếp có c đứng trước và không chứa a.
- Kiểm tra thêm với ví dụ trong `FP-Growth_Sol.pdf` (5 giao dịch F,C,A,M,P ...): Conditional Pattern Base của P = {{F,C,A,M : 2}, {C,B : 1}}; của M = {{F,C,A : 2}, {F,C,A,B : 1}}; của B = {{F : 1}, {C : 1}, {F,C,A : 1}}; của A = {{F,C : 3}}; của C = {{F : 3}}.

**PageRank** (damping d = 0.85, khởi tạo mọi trang = 1)
- Cạnh: 1→2, 2→5, 3→1, 3→2, 3→4, 3→5, 4→3, 4→5, 5→4
- Lặp 1: PR(2) = 1.2125; PR(1) = 0.3625

**CPT**
- Các chuỗi: s1 = [A,B,C,D,F], s2 = [D,C,B,E], s3 = [E,A,D,C,B], s4 = [E,G,A,D,B,C]
- `predict([D, C])` → phần tử điểm cao nhất là **B**

**Leitner**
- Hộp 1→2→3→4→5 có khoảng ôn 1, 2, 4, 8, 16 ngày; "Quên" luôn về hộp 1; "Nhớ" ở hộp 5 vẫn giữ hộp 5.

**BFS/DFS**
- Trên đồ thị ví dụ bất kỳ có thứ tự kề cố định, BFS ra thứ tự theo tầng, DFS ra thứ tự theo nhánh sâu; agent tự tạo đồ thị 5 đỉnh để kiểm tra.
