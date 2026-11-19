# Danh sách các điểm cần người dùng xác nhận (QUESTIONS_FOR_USER.md)

Tài liệu này ghi lại các điểm chưa rõ ràng, mâu thuẫn giữa đề cương gốc, slide bài giảng và các giả định hợp lý mà hệ thống đang sử dụng:

### 1. Câu 29: Số liệu bảng Condition Pattern Base chưa đồng nhất
- **Hiện tượng**: Trong bảng đề thi, dòng `Y` ghi `{X:4, T:3}` (tức cặp Y và T gặp nhau 3 lần), nhưng ở dòng `T` lại ghi `{Y:4, Z:3}` (tức cặp T và Y gặp nhau 4 lần).
- **Giả định của web**:
  - Với $Minsup = 4$, tập phổ biến 2 phần tử không chứa $X$ chắc chắn gồm `{Y, Z}` (hoặc `{Z, Y}` với support $\ge 4$).
  - Đối với cặp $\{Y, T\}$: Nếu xét theo dòng T thì tần suất đạt 4 $\ge 4$; nếu xét theo dòng Y thì tần suất là 3. Hệ thống hiển thị cả 2 tập `{Y, Z}` và `{Y, T}`, đồng thời giải thích rõ điểm mâu thuẫn này trong phần `commonMistakes` và `explanation` để sinh viên lưu ý khi làm bài với giảng viên.

### 2. Câu 31: Công thức PageRank và Damping Factor
- **Hiện tượng**: Đề thi ghi "PageRank của các trang được khởi tạo là 1", không nói rõ có áp dụng damping factor $d = 0.85$ hay không.
- **Đối chiếu slide**: Slide 6 (trang 18) giảng viên tính theo công thức: $PR_1(v) = (1 - d) + d \times \sum \frac{PR(u)}{C(u)}$ với $d = 0.85$.
- **Giả định của web**:
  - Mặc định tính theo slide ($d = 0.85$): $PR_1(Page 2) = 0.15 + 0.85 \times (1/1 + 1/4) = 1.2125$; $PR_1(Page 1) = 0.15 + 0.85 \times (1/4) = 0.3625$.
  - Trình chấm thi và chế độ kiểm tra chấp nhận cả trường hợp không dùng damping factor ($PR_1(Page 2) = 1.25$, $PR_1(Page 1) = 0.25$) để tránh làm người học bối rối nếu đề thi trên lớp dùng công thức giản lược.

### 3. Câu 37: Thuật ngữ "CLM"
- **Hiện tượng**: Phụ lục A phỏng đoán là "Causal Language Modeling" (AI/LLM).
- **Đối chiếu slide**: Slide 7 (trang 10 - Fine-grained Security) nêu rõ: **CLM** là **Column-level Masking** (Che giấu dữ liệu cấp cột, ví dụ ẩn số điện thoại thành 091xxxx888 để bảo vệ thông tin PII mà không làm đổi cấu trúc bảng).
- **Quyết định**: Ưu tiên slide bài giảng theo đúng Quy tắc 4. Định nghĩa chính là **Column-level Masking**; phần ghi chú có bổ sung thêm Causal Language Modeling để sinh viên đối chiếu.

### 4. Câu 6: Kích thước Micro-partitioning
- **Hiện tượng**: Phụ lục A ghi "50–500 MB dữ liệu chưa nén".
- **Đối chiếu slide**: Slide 2 (trang 9) ghi: "Mỗi phân vùng thường có từ 50MB đến 500MB dữ liệu nén".
- **Quyết định**: Cập nhật theo Slide 2: **50–500 MB dữ liệu nén**.

### 5. Câu 30: Ngưỡng Minsup thông thường
- **Hiện tượng**: Phụ lục A ghi "1%–5%".
- **Đối chiếu slide**: Slide 5 (trang 9) ghi: "nằm dưới một giá trị ngưỡng tối thiểu được gọi là minsup, thường là 0.01 (1%) và minconf thường là 0.8 (80%)".
- **Quyết định**: Chấp nhận đáp án "1% (hoặc 1%–5%)", minconf thường là 80%.

### 6. Đánh số câu 33 trùng nhau trong đề gốc
- **Hiện tượng**: Đề thi có 2 câu ghi số 33: "33. Hiểu về cấu trúc cây CPT sau" và "33. Hiểu về BFS (Breadth-First Search)".
- **Quy ước**: Câu CPT mang ID `q33`, câu BFS mang ID `q33b`.
