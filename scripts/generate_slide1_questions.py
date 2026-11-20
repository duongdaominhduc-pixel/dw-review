# -*- coding: utf-8 -*-
"""
Script to generate comprehensive questions for Chapter 1 covering all bullet points of Slide 1.
Adds ch1_q01 to ch1_q51 to src/data/questions.json and links them to the lessons in src/data/chapters.json.
"""
import json

false = False
true = True

new_questions = [
    # --- LESSON 1: Tiến hóa RDBMS -> AI-Native Lakehouse (Slide 5-8) ---
    {
        "id": "ch1_q01",
        "number": "C1.1",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Trong những năm 1980, kỷ nguyên RDBMS ra đời nhằm tập trung giải quyết bài toán cốt lõi nào?",
        "answer": "Tập trung xử lý các giao dịch trực tuyến đơn lẻ mang tính nguyên tử (OLTP - Online Transaction Processing).",
        "explanation": "Thập niên 1980 là kỷ nguyên thống trị của RDBMS (như Oracle, IBM DB2, sau đó là MS SQL Server, MySQL). Mục tiêu hàng đầu là đảm bảo tính toàn vẹn dữ liệu cho các giao dịch kinh doanh hàng ngày (ngân hàng rút tiền, thanh toán đơn hàng) dựa trên 4 thuộc tính ACID.",
        "eli5": "RDBMS thời kỳ đầu giống như cuốn sổ thu chi của cô thủ quỹ: ghi nhận từng giao dịch mua bán phát sinh ngay tức khắc một cách chính xác tuyệt đối.",
        "commonMistakes": ["Nhầm lẫn với mục tiêu phân tích báo cáo quản trị tổng hợp (đó là Data Warehouse ra đời vào 1990s)."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q02",
        "number": "C1.2",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Mục đích cốt lõi của sự xuất hiện của Data Warehouse trong thập niên 1990 là gì?",
        "answer": "Tách biệt tải xử lý giao dịch (OLTP) để phục vụ báo cáo quản trị và phân tích tổng hợp (OLAP).",
        "explanation": "Khi dữ liệu ngày càng lớn, nếu chạy các câu lệnh SQL phân tích nặng (tính tổng doanh thu cả năm, nhóm theo khu vực) trực tiếp trên cơ sở dữ liệu giao dịch OLTP sẽ làm treo hệ thống bán hàng. Data Warehouse ra đời (do Bill Inmon và Ralph Kimball khởi xướng) để lưu trữ dữ liệu lịch sử đã làm sạch phục vụ riêng cho Business Intelligence và OLAP.",
        "eli5": "Giống như việc tách phòng kế toán tổng hợp số liệu sang một văn phòng riêng, để khách hàng ở quầy thanh toán không bị đứng chờ máy tính load dữ liệu.",
        "commonMistakes": ["Nghĩ rằng Data Warehouse dùng để thay thế hoàn toàn hệ thống RDBMS giao dịch."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q03",
        "number": "C1.3",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Làn sóng Data Lake xuất hiện vào những năm 2010 chủ yếu dựa trên nền tảng nào và giải quyết bài toán gì?",
        "answer": "Dựa trên Hadoop/HDFS và Cloud Storage (S3), nhằm lưu trữ khối lượng dữ liệu thô khổng lồ đa định dạng với chi phí thấp.",
        "explanation": "Thập niên 2010 bùng nổ dữ liệu mạng xã hội, log web, cảm biến IoT và đa phương tiện. Data Warehouse truyền thống quá đắt đỏ và chỉ nhận dữ liệu có cấu trúc bảng chặt chẽ. Data Lake ra đời cho phép 'lưu trước xử lý sau' (Schema-on-read) trên hạ tầng máy chủ thương mại giá rẻ.",
        "eli5": "Data Lake giống như một cái hồ lớn, bất kể nước mưa, nước suối (file text, ảnh, log) đều đổ vào được ngay mà không cần lọc trước.",
        "commonMistakes": ["Nhầm Data Lake với Data Warehouse; Data Lake lưu file thô, còn Data Warehouse lưu bảng đã làm sạch."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q04",
        "number": "C1.4",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Kiến trúc Lakehouse (thập niên 2020) được định nghĩa là sự hợp nhất giữa hai yếu tố nào?",
        "answer": "Hợp nhất sự tin cậy, giao dịch ACID của Data Warehouse và tính linh hoạt, chi phí rẻ của Data Lake.",
        "explanation": "Lakehouse giải quyết sự bất cập của việc phải duy trì hai hệ thống tách rời. Bằng cách bổ sung tầng metadata mở (Open Table Formats như Delta Lake, Iceberg) trực tiếp lên Cloud Object Storage, Lakehouse cung cấp đầy đủ các tính năng SQL, ACID, Time travel trực tiếp trên kho file giá rẻ.",
        "eli5": "Lakehouse là ngôi nhà biệt thự xây ngay bên hồ nước: vừa có hồ bơi tự nhiên rộng lớn (lưu file rẻ), vừa có tiện nghi cao cấp sạch sẽ (giao dịch ACID chuẩn).",
        "commonMistakes": ["Cho rằng Lakehouse là một phần mềm độc quyền; thực tế nó là một mô hình kiến trúc mở."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q05",
        "number": "C1.5",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Sự dịch chuyển tư duy cốt lõi trong hệ sinh thái dữ liệu hiện đại là gì?",
        "answer": "Chuyển từ 'Lưu trữ để báo cáo quá khứ' sang 'Lưu trữ để dự báo và tự động hành động'.",
        "explanation": "Theo Slide 1 bài giảng, kiến trúc dữ liệu hiện đại (AI-Native) không chỉ hướng đến việc tạo các biểu đồ tĩnh nhìn lại lịch sử tháng trước, mà hướng đến việc cung cấp luồng dữ liệu thời gian thực cho các mô hình học máy và AI Agent tự động ra quyết định ngay lúc này.",
        "eli5": "Không phải nhìn gương chiếu hậu để xem đoạn đường đã qua, mà là bật định vị GPS kèm camera AI để tự động lái xe về phía trước.",
        "commonMistakes": ["Nghĩ rằng báo cáo quản trị BI đã bị xóa bỏ; thực tế BI vẫn tồn tại nhưng AI dự báo trở thành trọng tâm."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q06",
        "number": "C1.6",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Nguyên nhân nào khiến Schema-on-write của RDBMS trở thành hạn chế lớn trong kỷ nguyên Big Data?",
        "answer": "Yêu cầu cấu trúc dữ liệu nghiêm ngặt trước khi nạp; khi dữ liệu nguồn thay đổi hoặc phi cấu trúc, toàn bộ pipeline dễ bị gãy vỡ.",
        "explanation": "Schema-on-write đòi hỏi phải chạy lệnh DDL tạo bảng, định nghĩa kiểu dữ liệu từng cột trước khi chèn (INSERT). Với Big Data, cấu trúc dữ liệu liên tục biến động (ví dụ payload JSON thêm trường mới). Ngược lại, kiến trúc hiện đại dùng Schema-on-read hoặc Schema Evolution linh hoạt.",
        "eli5": "Schema-on-write giống như khuôn làm bánh cứng: chỉ cho phép bột đúng kích cỡ lọt vào, nếu cục bột to hơn một chút là khuôn bị kẹt.",
        "commonMistakes": ["Nhầm Schema-on-write với Schema-on-read."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q07",
        "number": "C1.7",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tại sao AI-Native Lakehouse lại cần tính năng hỗ trợ Native Vector (Vector Embeddings)?",
        "answer": "Để lưu trữ và tìm kiếm vector tương đồng (Similarity Search) trực tiếp phục vụ các mô hình ngôn ngữ lớn (LLMs, RAG).",
        "explanation": "Trong kỷ nguyên Generative AI, dữ liệu văn bản, hình ảnh được các mô hình Embedding mã hóa thành các chuỗi vector nhiều chiều. AI-Native Lakehouse hỗ trợ kiểu dữ liệu Vector và các chỉ mục HNSW/IVFFlat ngay trong bảng để thực hiện tìm kiếm ngữ nghĩa siêu tốc.",
        "eli5": "Biến chữ và nghĩa thành các tọa độ không gian số để AI có thể tìm thấy các đoạn văn 'gần nghĩa nhất' với câu hỏi của người dùng.",
        "commonMistakes": ["Nghĩ rằng Vector chỉ dùng cho đồ họa máy tính."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q08",
        "number": "C1.8",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tính năng Feature Store được tích hợp trong AI-Native Lakehouse có chức năng gì?",
        "answer": "Quản lý, theo dõi phiên bản và tái sử dụng các đặc trưng (features) cho quá trình huấn luyện và phục vụ mô hình Machine Learning.",
        "explanation": "Feature Store giải quyết bài toán 'Data Leakage' (rò rỉ dữ liệu) và đảm bảo tính nhất quán giữa dữ liệu lúc huấn luyện offline (training) và dữ liệu lúc dự báo online (serving), tránh việc nhiều nhóm AI phải viết lại các phép tính đặc trưng trùng lặp.",
        "eli5": "Feature Store giống như một siêu thị nguyên liệu đã sơ chế sẵn: các kỹ sư AI chỉ cần đến lấy về nấu món ăn (huấn luyện model) mà không phải gọt vỏ thái rau lại từ đầu.",
        "commonMistakes": ["Nhầm Feature Store với Data Catalog; Data Catalog quản lý metadata bảng, còn Feature Store quản lý biến đầu vào của model ML."],
        "needsSlideCheck": false
    },

    # --- LESSON 2: Modern DWH Cloud & Quản lý chi phí (Slide 9-12) ---
    {
        "id": "ch1_q09",
        "number": "C1.9",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Đặc tính 'Zero Management' của Modern Data Warehouse trên Cloud mang lại ý nghĩa gì cho doanh nghiệp?",
        "answer": "Giảm thiểu tối đa việc cấu hình phần cứng, cài đặt bản vá, phân vùng đĩa vật lý và bảo trì hệ thống.",
        "explanation": "Với Modern DWH (Snowflake, BigQuery), các tác vụ phức tạp của DBA truyền thống như tuning chỉ mục, backup ổ cứng, cấu hình RAID đều do nhà cung cấp dịch vụ đám mây tự động hóa hoàn toàn dưới dạng SaaS.",
        "eli5": "Bạn chỉ việc lên xe và nhấn ga chạy (chạy truy vấn SQL), còn việc thay dầu nhớt, bơm lốp, kiểm tra động cơ đã có hãng xe lo trọn gói.",
        "commonMistakes": ["Cho rằng Zero Management là người dùng không cần thiết kế mô hình dữ liệu; mô hình dữ liệu logic vẫn do kỹ sư quyết định."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q10",
        "number": "C1.10",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Việc loại bỏ CAPEX chuyển sang OPEX trong Modern Data Warehouse có ý nghĩa tài chính thế nào?",
        "answer": "Không cần đầu tư vốn lớn mua sắm máy chủ vật lý ban đầu, mà chuyển sang chi trả chi phí vận hành linh hoạt theo mức sử dụng thực tế.",
        "explanation": "CAPEX (Capital Expenditure) là chi phí mua sắm tài sản cố định (phòng server, máy chủ tiền tỷ). OPEX (Operational Expenditure) là chi phí vận hành chi trả hàng tháng. Chuyển sang OPEX giúp doanh nghiệp linh hoạt dòng tiền và giảm rủi ro đầu tư ban đầu.",
        "eli5": "Thay vì phải bỏ ra 500 triệu mua một chiếc ô tô để thi thoảng đi xa, bạn chọn đi taxi hoặc thuê xe tự lái chuyến nào trả tiền chuyến đó.",
        "commonMistakes": ["Nhầm lẫn giữa định nghĩa CAPEX (chi phí vốn đầu tư) và OPEX (chi phí vận hành)."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q11",
        "number": "C1.11",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tính năng Zero-copy Cloning trong Snowflake hoạt động theo nguyên lý nào?",
        "answer": "Tạo bản sao môi trường dữ liệu tức thời bằng cách sao chép các con trỏ metadata mà không nhân bản dữ liệu vật lý trên đĩa.",
        "explanation": "Zero-copy Cloning cho phép clone một bảng, schema hoặc toàn bộ database dung lượng hàng trăm Terabytes chỉ trong vài giây. Vì cả bản gốc và bản sao cùng trỏ vào các file dữ liệu bất biến ban đầu, không tốn thêm byte dung lượng lưu trữ nào cho đến khi có thay đổi phát sinh.",
        "eli5": "Giống như việc bạn tạo một phím tắt (shortcut) trên màn hình máy tính trỏ vào file gốc: bấm mở ra nội dung như nhau nhưng phím tắt không tốn dung lượng ổ cứng.",
        "commonMistakes": ["Nghĩ rằng Zero-copy Cloning sẽ copy toàn bộ các file dữ liệu sang thư mục mới."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q12",
        "number": "C1.12",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Google BigQuery sử dụng hai thành phần hạ tầng nào cho tầng lưu trữ và tầng tính toán?",
        "answer": "Colossus (tầng lưu trữ đối tượng phân tán) và Borg (tầng tính toán điều phối tài nguyên container).",
        "explanation": "BigQuery kết nối giữa Colossus và Borg thông qua mạng băng thông Petabit 'Jupiter'. Người dùng không cần tạo hay cấu hình Virtual Warehouse mà hệ thống tự động cấp phát tài nguyên theo số slot xử lý của từng câu truy vấn.",
        "eli5": "Colossus là kho chứa đồ khổng lồ, còn Borg là đội quân công nhân linh hoạt được gọi tới bốc dỡ hàng khi có yêu cầu và giải tán ngay khi xong việc.",
        "commonMistakes": ["Nghĩ BigQuery dùng HDFS để lưu trữ."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q13",
        "number": "C1.13",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Nền tảng Cloud DWH nào được thiết kế đặc thù để đạt tốc độ truy vấn 'sub-second' cho dữ liệu lớn?",
        "answer": "Firebolt.",
        "explanation": "Firebolt là nền tảng Cloud Data Warehouse thế hệ mới tập trung giải quyết bài toán tương tác người dùng theo thời gian thực (sub-second queries trên hàng chục tỷ dòng). Firebolt tối ưu hóa nhờ nén dữ liệu cực cao và cấu trúc chỉ mục thưa Sparse Index.",
        "eli5": "Nếu BigQuery là chiếc xe tải chở hàng siêu trường siêu trọng, thì Firebolt là chiếc xe đua F1 tăng tốc tức thì dưới 1 giây.",
        "commonMistakes": ["Chọn Redshift hoặc BigQuery; Firebolt mới là nền tảng nổi tiếng về sub-second response trong tài liệu học."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q14",
        "number": "C1.14",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Chiến lược Auto-suspend trong Modern Data Warehouse hoạt động như thế nào?",
        "answer": "Tự động tắt cụm máy ảo tính toán khi không có câu truy vấn phát sinh sau một khoảng thời gian nhàn rỗi được cấu hình trước.",
        "explanation": "Cụm tính toán (Virtual Warehouse) trên Cloud tính phí theo giây chạy. Nếu để máy chủ chạy 24/7 mà không có ai truy vấn vào ban đêm sẽ gây lãng phí hàng ngàn credit. Cấu hình Auto-suspend (ví dụ: sau 5 phút nhàn rỗi) giúp giảm tới 70-80% hóa đơn tiền điện toán.",
        "eli5": "Giống như bóng đèn cảm ứng ở cầu thang: khi có người đi thì tự sáng, sau 3 phút không có ai thì tự động tắt để tiết kiệm điện.",
        "commonMistakes": ["Nghĩ rằng Auto-suspend sẽ xóa luôn dữ liệu; chỉ có cụm CPU bị tắt, dữ liệu ở Storage vẫn an toàn nguyên vẹn."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q15",
        "number": "C1.15",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Điều kiện để một câu truy vấn được phục vụ từ Query Result Caching mà không tốn chi phí tính toán là gì?",
        "answer": "Câu truy vấn phải hoàn toàn giống hệt câu trước đó, và dữ liệu nguồn của các bảng liên quan không có bất kỳ thay đổi nào.",
        "explanation": "Result Cache lưu kết quả trong bộ nhớ trong 24 giờ. Khi có truy vấn gửi tới, hệ thống kiểm tra chữ ký truy vấn và metadata của bảng nguồn. Nếu bảng chưa bị INSERT/UPDATE/DELETE, kết quả được trả ngay lập tức với chi phí Compute = 0.",
        "eli5": "Giống như cô bán bánh photocopy sẵn tờ giải đề thi: ai hỏi đúng câu đó thì cô đưa luôn bản photo, không cần phải ngồi giải lại từ đầu.",
        "commonMistakes": ["Cho rằng Caching trả về kết quả sai khi dữ liệu cập nhật; hệ thống tự động vô hiệu hóa cache khi dữ liệu nguồn thay đổi."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q16",
        "number": "C1.16",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Kỹ thuật Data Pruning giúp giảm chi phí truy vấn bằng cách nào?",
        "answer": "Sử dụng metadata Min/Max của các phân vùng để bỏ qua các khối dữ liệu không thỏa mãn điều kiện lọc, giảm lượng dữ liệu cần quét.",
        "explanation": "Trên các nền tảng tính phí theo lượng dữ liệu quét (như BigQuery với 5 USD / TB quét), nếu câu truy vấn lọc `WHERE ngay_tao >= '2026-11-01'`, Data Pruning sẽ đọc metadata và bỏ qua toàn bộ các phân vùng của các tháng trước, giúp tiết kiệm lượng lớn chi phí và tăng tốc truy vấn.",
        "eli5": "Giống như đọc mục lục cuốn sách để lật thẳng tới trang cần đọc, thay vì phải đọc từng trang từ đầu đến cuối.",
        "commonMistakes": ["Nhầm Data Pruning với việc xóa dữ liệu cũ; Pruning chỉ là bỏ qua không đọc trong lúc thực thi truy vấn."],
        "needsSlideCheck": false
    },

    # --- LESSON 3: Data Fabric (Slide 13-17, 19-23) ---
    {
        "id": "ch1_q17",
        "number": "C1.17",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Nguyên lý Zero-copy trong kiến trúc Data Fabric mang lại ưu thế cốt tử nào?",
        "answer": "Cho phép truy cập và phân tích dữ liệu trực tiếp tại nơi nó đang lưu mà không cần sao chép hay di chuyển dữ liệu vật lý.",
        "explanation": "Trước đây, muốn phân tích phải gom toàn bộ dữ liệu từ các hệ thống nghiệp vụ về một kho tập trung qua ETL, gây tốn băng thông, chi phí lưu trữ gấp đôi và trễ dữ liệu. Data Fabric dùng lớp ảo hóa logic để truy vấn tại chỗ (Zero-copy).",
        "eli5": "Thay vì phải gom toàn bộ sách của các thư viện trường khác về nhà mình (tốn chỗ chứa), bạn dùng một tài khoản tra cứu trực tuyến để đọc sách từ xa ở bất cứ đâu.",
        "commonMistakes": ["Nghĩ rằng Zero-copy nghĩa là không có dữ liệu nào được truyền qua mạng; dữ liệu kết quả vẫn được truyền về."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q18",
        "number": "C1.18",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Data Catalog trong kiến trúc dữ liệu hiện đại đóng vai trò gì?",
        "answer": "Là danh mục lưu trữ metadata tập trung, giúp tìm kiếm, khám phá ngữ cảnh và đánh giá độ tin cậy của tài sản dữ liệu toàn doanh nghiệp.",
        "explanation": "Data Catalog được ví như 'Google Search nội bộ' cho toàn bộ dữ liệu doanh nghiệp. Nó ghi nhận tên bảng, mô tả nghiệp vụ, chủ sở hữu, lịch sử dòng đời (Data Lineage), tần suất sử dụng và xếp hạng độ tin cậy của dữ liệu.",
        "eli5": "Data Catalog giống như mục lục tra cứu điện tử của thư viện quốc gia: bạn gõ 'doanh thu khách hàng', nó chỉ ngay sách nào, ở kệ nào, ai viết và có đáng tin cậy không.",
        "commonMistakes": ["Nhầm Data Catalog là nơi lưu dữ liệu bảng; nó chỉ lưu siêu dữ liệu (metadata) mô tả về dữ liệu."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q19",
        "number": "C1.19",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Sự khác biệt căn bản giữa 'Static Metadata' và 'Active Metadata' là gì?",
        "answer": "Static Metadata chỉ mô tả cấu trúc tĩnh, trong khi Active Metadata liên tục ghi nhận hành vi truy cập, hiệu năng và phân loại tự động bằng AI.",
        "explanation": "Static metadata chỉ chứa schema (cột, kiểu dữ liệu) được cập nhật thủ công và nhanh chóng lỗi thời. Active Metadata được thu thập tự động theo thời gian thực từ log truy vấn, pipeline metrics, giúp hệ thống tự tối ưu hóa và cảnh báo bảo mật.",
        "eli5": "Static metadata giống như tấm ảnh chụp thẻ căn cước (tĩnh); còn Active Metadata giống như chiếc đồng hồ thông minh theo dõi nhịp tim, bước đi liên tục 24/7.",
        "commonMistakes": ["Cho rằng hai thuật ngữ này là đồng nghĩa."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q20",
        "number": "C1.20",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Thành phần Knowledge Graph trong Data Fabric giải quyết vấn đề gì?",
        "answer": "Mô hình hóa các mối quan hệ ngữ nghĩa kinh doanh phức tạp giữa các thực thể dữ liệu phân tán.",
        "explanation": "Trong doanh nghiệp, một thực thể như 'Khách hàng' có thể xuất hiện ở 10 bảng khác nhau dưới các tên gọi khác nhau (`cust_id`, `client_code`, `user_uuid`). Knowledge Graph liên kết ngữ nghĩa các thực thể này thành một mạng lưới tri thức kinh doanh có ý nghĩa.",
        "eli5": "Knowledge Graph giống như sơ đồ cây gia phả: giúp nhìn rõ ai là bố, ai là con, dù tên gọi hay họ tên có viết khác nhau ở các giấy tờ riêng lẻ.",
        "commonMistakes": ["Nghĩ rằng Knowledge Graph chỉ dùng trong trí tuệ nhân tạo hàn lâm."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q21",
        "number": "C1.21",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Công nghệ Data Virtualization (như Trino, Starburst, Dremio) hoạt động theo cơ chế nào?",
        "answer": "Cung cấp giao diện truy vấn SQL trừu tượng liên nguồn (Federated Query) mà không cần ETL nạp dữ liệu về một nơi.",
        "explanation": "Data Virtualization tiếp nhận câu lệnh SQL của người dùng, phân tích cú pháp và tự động chia nhỏ thành các truy vấn con gửi tới từng nguồn dữ liệu (Postgres, S3, MongoDB), sau đó tổng hợp kết quả trả về trong bộ nhớ RAM.",
        "eli5": "Giống như người phiên dịch viên đa ngôn ngữ: bạn chỉ cần nói một câu tiếng Việt, anh ấy tự dịch sang tiếng Anh, Pháp, Nhật gửi tới các đối tác rồi gom câu trả lời lại cho bạn.",
        "commonMistakes": ["Nghĩ rằng Data Virtualization lưu dữ liệu vĩnh viễn trên đĩa; nó chỉ xử lý dữ liệu bay (in-flight) trong bộ nhớ."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q22",
        "number": "C1.22",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Ba mục tiêu chiến lược quan trọng của Data Fabric là gì?",
        "answer": "Kết nối dữ liệu đa nguồn Zero-copy, thúc đẩy tự phục vụ phân tích (Self-service), và thống nhất quản trị bảo mật toàn diện.",
        "explanation": "Đây là câu hỏi cốt lõi của đề cương môn học (Câu 3). Ba mục tiêu này giúp phá vỡ các ốc đảo dữ liệu (Data Silos), giải phóng sức lao động của đội IT và đảm bảo tuân thủ các quy định bảo mật dữ liệu toàn cầu.",
        "eli5": "1. Gom mọi dữ liệu lại mà không cần di chuyển; 2. Để nhân viên tự vào tra cứu lấy số liệu; 3. Đảm bảo an toàn không lộ thông tin nhạy cảm.",
        "commonMistakes": ["Thiếu 1 trong 3 mục tiêu hoặc nhầm lẫn với mục tiêu của Data Mesh."],
        "needsSlideCheck": false
    },

    # --- LESSON 4: Data Mesh (Slide 18, 30-33) ---
    {
        "id": "ch1_q23",
        "number": "C1.23",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Kiến trúc Data Mesh tiếp cận bài toán dữ liệu lớn từ khía cạnh nào là chủ yếu?",
        "answer": "Tiếp cận từ khía cạnh mô hình tổ chức, phân cấp quyền sở hữu dữ liệu theo miền nghiệp vụ và văn hóa con người.",
        "explanation": "Khác với Data Fabric hay Lakehouse tập trung vào công nghệ phần mềm, Data Mesh (do Zhamak Dehghani khởi xướng) khẳng định vấn đề nghẽn cổ chai dữ liệu trong doanh nghiệp bắt nguồn từ cơ cấu tổ chức tập trung hóa lỗi thời, cần phi tập trung hóa quyền sở hữu.",
        "eli5": "Data Mesh giống như chuyển từ mô hình bao cấp tập trung sang mô hình giao quyền tự chủ cho từng địa phương tự quản lý kinh tế của mình.",
        "commonMistakes": ["Nghĩ rằng Data Mesh là một phần mềm hoặc công cụ cài đặt được trên máy tính."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q24",
        "number": "C1.24",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Trong nguyên lý 'Domain-driven Data Ownership' của Data Mesh, ai là người chịu trách nhiệm về chất lượng dữ liệu?",
        "answer": "Chính đội ngũ nghiệp vụ tạo ra dữ liệu ở miền đó (ví dụ: Tiếp thị, Bán hàng, Chuỗi cung ứng).",
        "explanation": "Đội ngũ nghiệp vụ là những người hiểu sâu nhất về ý nghĩa các con số và logic phát sinh giao dịch. Giao trách nhiệm kiểm soát chất lượng cho họ sẽ chấm dứt tình trạng 'đổ rác dữ liệu' cho đội ngũ IT trung tâm dọn dẹp.",
        "eli5": "Nhà ai xả rác thì nhà đó tự dọn dẹp sạch sẽ trước khi đưa ra đường, không thể bắt bác tổ trưởng tổ dân phố đi dọn rác cho từng nhà.",
        "commonMistakes": ["Cho rằng đội ngũ kỹ sư IT trung tâm vẫn chịu trách nhiệm về tính chính xác của dữ liệu nghiệp vụ."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q25",
        "number": "C1.25",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Khái niệm 'Data as a Product' (DaaP) trong Data Mesh yêu cầu một sản phẩm dữ liệu phải có những gì?",
        "answer": "Có chủ sở hữu (Data Product Owner), có Data Contract (cam kết SLA, schema), tài liệu hướng dẫn và dễ dàng khám phá/sử dụng.",
        "explanation": "Dữ liệu được đối xử như một sản phẩm thương mại hoàn chỉnh. Người dùng nội bộ là khách hàng. Nếu sản phẩm dữ liệu bị lỗi hoặc trễ giờ so với Data Contract, chủ sở hữu sản phẩm dữ liệu phải chịu trách nhiệm giải quyết.",
        "eli5": "Dữ liệu không phải là mớ rau bán ngoài chợ không nhãn mác, mà là hộp sữa trong siêu thị có hạn sử dụng, thành phần dinh dưỡng và số hotline chăm sóc khách hàng.",
        "commonMistakes": ["Nghĩ rằng mọi bảng dữ liệu thô đều tự động được coi là Data Product."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q26",
        "number": "C1.26",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Vai trò của 'Self-serve Data Platform' trong kiến trúc Data Mesh là gì?",
        "answer": "Cung cấp nền tảng hạ tầng tự động hóa dùng chung giúp các miền nghiệp vụ tự xây dựng và vận hành sản phẩm dữ liệu dễ dàng.",
        "explanation": "Đội ngũ nền tảng trung tâm (Data Platform Team) xây dựng các công cụ 'tự phục vụ' (như tạo kho lưu trữ với 1 click, tự động cấp quyền truy cập, pipeline CI/CD mẫu) để các chuyên viên dữ liệu ở từng phòng ban có thể tự làm việc mà không cần kiến thức hạ tầng chuyên sâu.",
        "eli5": "Giống như việc trang bị sẵn căn bếp hiện đại đầy đủ bếp từ, lò nướng, dao thớt; ai muốn nấu món gì thì vào bếp tự nấu nhanh chóng.",
        "commonMistakes": ["Nghĩ rằng Self-serve Platform là phần mềm BI cho người dùng cuối tạo biểu đồ kéo thả."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q27",
        "number": "C1.27",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Nguyên lý 'Federated Computational Governance' trong Data Mesh giải quyết bài toán gì?",
        "answer": "Cân bằng giữa quyền tự chủ của từng miền và việc tuân thủ các quy chuẩn bảo mật, chất lượng chung toàn doanh nghiệp thông qua tự động hóa bằng code.",
        "explanation": "Phân cấp không đồng nghĩa với vô chính phủ. Ban quản trị liên bang (gồm đại diện các miền và chuyên gia bảo mật) thống nhất các quy chuẩn chung (như chuẩn mã hóa khách hàng, quy định che giấu PII) và áp dụng chúng tự động thông qua Policy-as-Code.",
        "eli5": "Giống như luật giao thông quốc gia: mỗi tài xế tự do lái xe đi đâu tùy thích (tự chủ), nhưng tất cả đều phải dừng đèn đỏ và đi đúng làn đường (quy chuẩn liên bang).",
        "commonMistakes": ["Nghĩ rằng Data Mesh xóa bỏ hoàn toàn việc quản trị dữ liệu."],
        "needsSlideCheck": false
    },

    # --- LESSON 5: Unified Lakehouse & Medallion (Slide 24-29) ---
    {
        "id": "ch1_q28",
        "number": "C1.28",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Vấn đề 'Data Swamp' (Đầm lầy dữ liệu) trong các Data Lake truyền thống bắt nguồn từ đâu?",
        "answer": "Do thiếu cơ chế kiểm soát chất lượng, thiếu tầng quản lý metadata và không hỗ trợ giao dịch ACID, khiến file rác tích tụ mất kiểm soát.",
        "explanation": "Data Lake cho phép ai cũng có thể đẩy file vào mà không cần kiểm duyệt schema. Qua thời gian, hàng triệu file CSV/JSON không có tài liệu mô tả, trùng lặp và không rõ nguồn gốc tích tụ lại, khiến không ai dám sử dụng dữ liệu này cho báo cáo chính thống.",
        "eli5": "Giống như nhà kho chứa đồ phế liệu: đồ gì cũng nhét vào nhưng không ghi nhãn, đến khi cần tìm một món đồ thì chịu chết không thể tìm thấy.",
        "commonMistakes": ["Cho rằng Data Lake và Data Swamp là hai sản phẩm khác nhau; Data Swamp là tình trạng suy thoái của Data Lake thiếu quản trị."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q29",
        "number": "C1.29",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Kể tên ba định dạng bảng mở (Open Table Formats) tiêu chuẩn công nghiệp hiện nay trong kiến trúc Lakehouse?",
        "answer": "Apache Iceberg, Delta Lake, và Apache Hudi.",
        "explanation": "Cả ba định dạng này đều sử dụng định dạng lưu trữ file cột (chủ yếu là Parquet) nhưng bổ sung một lớp metadata thông minh ghi nhận lịch sử commit và snapshots, mang lại khả năng quản trị bảng cơ sở dữ liệu chuyên nghiệp cho Cloud Storage.",
        "eli5": "Bộ ba quyền lực biến những file Parquet vô tri thành các bảng dữ liệu thông minh có đầy đủ tính năng xịn sò như cơ sở dữ liệu đắt tiền.",
        "commonMistakes": ["Kể tên Parquet, ORC, Avro; đây là File Formats, không phải Open Table Formats."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q30",
        "number": "C1.30",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tính năng 'Time Travel' trong Apache Iceberg và Delta Lake hoạt động dựa trên cơ chế nào?",
        "answer": "Dựa trên việc lưu trữ lịch sử các bản ghi snapshot metadata và tính bất biến (immutability) của các file dữ liệu.",
        "explanation": "Khi có thao tác INSERT/UPDATE/DELETE, hệ thống không ghi đè lên file cũ mà tạo file mới và tạo một bản snapshot metadata mới. Do đó, người dùng có thể dễ dàng truy vấn dữ liệu tại bất kỳ thời điểm nào trong quá khứ (`AS OF TIMESTAMP`).",
        "eli5": "Giống như tính năng 'Xem lịch sử chỉnh sửa' trong Google Docs hoặc Git commit: bạn có thể quay ngược về phiên bản bài viết của ngày hôm qua bất cứ lúc nào.",
        "commonMistakes": ["Nghĩ rằng Time Travel phải sao lưu toàn bộ cơ sở dữ liệu mỗi ngày."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q31",
        "number": "C1.31",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tầng Bronze trong kiến trúc Medallion có đặc điểm vận hành quan trọng nào?",
        "answer": "Lưu trữ dữ liệu nguyên bản từ nguồn, chỉ ghi thêm (Append-only) và không áp dụng bất kỳ phép biến đổi logic nghiệp vụ nào.",
        "explanation": "Tầng Bronze đóng vai trò là kho lưu trữ lịch sử thô bất khả xâm phạm. Nếu các logic làm sạch ở tầng sau bị lỗi, toàn bộ hệ thống có thể tái tạo (re-process) lại từ đầu nhờ nguồn dữ liệu gốc ở tầng Bronze.",
        "eli5": "Giống như cuộn băng ghi âm gốc của cuộc phỏng vấn: giữ nguyên từng tiếng thở, tiếng ồn, không cắt gọt để làm bằng chứng xác thực.",
        "commonMistakes": ["Lọc bỏ bản ghi lỗi ngay tại tầng Bronze; bản ghi lỗi vẫn phải được lưu nguyên vẹn ở Bronze và chỉ bị lọc ở Silver."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q32",
        "number": "C1.32",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tầng Silver trong kiến trúc Medallion thực hiện các nhiệm vụ xử lý cốt lõi nào?",
        "answer": "Làm sạch, khử trùng lặp (Deduplication), kiểm tra tính hợp lệ, ép đúng kiểu dữ liệu và giải mã các trường cấu trúc phức tạp.",
        "explanation": "Dữ liệu ở tầng Silver thể hiện góc nhìn thống nhất và sạch sẽ của toàn doanh nghiệp (Enterprise Conformed View). Dữ liệu này đã đủ độ tin cậy cho các kỹ sư dữ liệu và nhà khoa học dữ liệu khai phá.",
        "eli5": "Giống như công đoạn đãi cát tìm vàng, rửa sạch bụi bẩn và phân loại các thỏi quặng kim loại theo kích cỡ tiêu chuẩn.",
        "commonMistakes": ["Tổng hợp dữ liệu theo tháng/năm ở tầng Silver; tầng Silver vẫn giữ độ chi tiết (granularity) cấp giao dịch."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q33",
        "number": "C1.33",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tầng Gold trong kiến trúc Medallion được thiết kế phục vụ cho đối tượng nào là chính?",
        "answer": "Phục vụ trực tiếp cho người dùng nghiệp vụ (Business Users), Dashboard phân tích BI và các mô hình học máy cấp cao.",
        "explanation": "Tầng Gold thường được tổ chức theo mô hình chiều chuẩn Kimball (Star Schema với các bảng Fact và Dimension) hoặc các bảng tổng hợp (Aggregated Tables), tối ưu hóa tối đa cho tốc độ đọc và dễ hiểu với người làm kinh doanh.",
        "eli5": "Là món ăn thơm ngon đã được đầu bếp nấu chín và bày biện đẹp mắt trên đĩa sứ, sẵn sàng cho thực khách thưởng thức.",
        "commonMistakes": ["Lưu dữ liệu bán cấu trúc lộn xộn ở tầng Gold."],
        "needsSlideCheck": false
    },

    # --- LESSON 6: So sánh Mesh, Fabric, Lakehouse (Slide 30-33) ---
    {
        "id": "ch1_q34",
        "number": "C1.34",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Khi so sánh giữa Data Fabric và Data Mesh, điểm khác biệt căn bản nhất về mặt tiếp cận là gì?",
        "answer": "Data Fabric tập trung vào công nghệ tự động hóa và ảo hóa metadata, trong khi Data Mesh tập trung vào con người và phân cấp quyền sở hữu tổ chức.",
        "explanation": "Data Fabric cố gắng giải quyết bài toán dữ liệu bằng các thuật toán AI quét metadata và ảo hóa truy vấn để người dùng không phải lo dữ liệu nằm ở đâu. Data Mesh lại khẳng định công nghệ không giải quyết được nếu con người không chịu trách nhiệm về dữ liệu họ tạo ra.",
        "eli5": "Data Fabric là trang bị máy hút bụi robot tự động khắp nhà; còn Data Mesh là quy định phòng của ai thì người đó phải tự có trách nhiệm quét dọn.",
        "commonMistakes": ["Cho rằng Data Fabric và Data Mesh là hai công nghệ đối đầu triệt tiêu lẫn nhau."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q35",
        "number": "C1.35",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Vị trí lưu trữ dữ liệu thực tế giữa Data Fabric và Unified Lakehouse khác nhau như thế nào?",
        "answer": "Data Fabric để dữ liệu ở nguyên tại các hệ thống nguồn phân tán (Zero-copy), còn Lakehouse hợp nhất dữ liệu về một Cloud Object Storage duy nhất.",
        "explanation": "Data Fabric dùng lớp ảo hóa truy vấn tại chỗ trên nhiều loại database khác nhau. Lakehouse dùng các pipeline nạp toàn bộ dữ liệu vào một kho lưu trữ đối tượng trung tâm (như S3) dưới định dạng mở Parquet/Iceberg.",
        "eli5": "Data Fabric là đi ăn buffet ở nhiều nhà hàng khác nhau nhưng thanh toán qua 1 ứng dụng; Lakehouse là mua toàn bộ nguyên liệu mang về bếp nhà mình cất trong tủ lạnh.",
        "commonMistakes": ["Nghĩ rằng Data Fabric cũng phải có một Data Lake riêng để lưu toàn bộ dữ liệu."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q36",
        "number": "C1.36",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Trong mô hình kết hợp (Hybrid Synergy), ba kiến trúc Mesh, Fabric và Lakehouse phối hợp với nhau như thế nào?",
        "answer": "Lakehouse làm hạ tầng lưu trữ và tính toán; Data Fabric làm tầng tích hợp metadata và ảo hóa; Data Mesh định hướng mô hình tổ chức con người.",
        "explanation": "Đây là giải pháp kiến trúc tối ưu được các tập đoàn lớn áp dụng: Xây dựng nền tảng trên S3 + Iceberg (Lakehouse), dùng Active Metadata tự động phân loại PII (Data Fabric), và trao quyền sở hữu sản phẩm dữ liệu cho các phòng ban (Data Mesh).",
        "eli5": "Lakehouse là móng nhà kiên cố, Data Fabric là hệ thống điện nước thông minh tự động, còn Data Mesh là quy ước nếp sống văn minh giữa các thành viên trong gia đình.",
        "commonMistakes": ["Cho rằng doanh nghiệp chỉ được chọn duy nhất một trong ba kiến trúc."],
        "needsSlideCheck": false
    },

    # --- LESSON 7: Cloud Object Storage (Slide 34-37) ---
    {
        "id": "ch1_q37",
        "number": "C1.37",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Một đối tượng (Object) trong Cloud Object Storage bao gồm ba thành phần cấu tạo nào?",
        "answer": "Payload (nội dung dữ liệu thực tế), Metadata (thông tin mô tả đối tượng), và Unique Key (khóa định danh duy nhất).",
        "explanation": "Object Storage không lưu trữ theo khối đĩa (Block) hay cây thư mục (File System) mà đóng gói toàn bộ dữ liệu, metadata mở rộng và khóa định danh thành một đối tượng độc lập truy cập qua HTTP/HTTPS REST API.",
        "eli5": "Giống như kiện hàng chuyển phát nhanh: bên trong là món quà (Payload), bên ngoài dán giấy ghi người gửi/người nhận (Metadata), và mã vạch tracking duy nhất (Unique Key).",
        "commonMistakes": ["Nghĩ rằng Object Storage có các thư mục con vật lý như trên ổ cứng máy tính Windows/Mac."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q38",
        "number": "C1.38",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Cam kết độ bền 11 số 9 (99.999999999% Durability) trên AWS S3 nghĩa là gì về mặt xác suất mất mát dữ liệu?",
        "answer": "Nếu bạn lưu trữ 10.000.000 đối tượng trên S3, trung bình 10.000 năm bạn mới có khả năng mất mát duy nhất 1 đối tượng.",
        "explanation": "Độ bền này đạt được nhờ cơ chế tự động nhân bản (replication) dữ liệu phân tán trên ít nhất 3 Trung tâm dữ liệu (Availability Zones) độc lập về nguồn điện, mạng và vị trí địa lý trong một vùng (Region).",
        "eli5": "Xác suất bạn bị sét đánh trúng khi đang ngủ trong nhà còn cao hơn xác suất một file lưu trên S3 tự dưng bị mất mát do lỗi phần cứng.",
        "commonMistakes": ["Nhầm lẫn giữa Độ bền (Durability - dữ liệu không bị mất) và Tính sẵn sàng (Availability - hệ thống luôn phản hồi yêu cầu truy cập)."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q39",
        "number": "C1.39",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tại sao tầng Cold Storage (như AWS S3 Glacier) có phí lưu trữ cực rẻ nhưng doanh nghiệp không nên đưa toàn bộ dữ liệu vào đó?",
        "answer": "Vì Glacier có độ trễ truy xuất dữ liệu lâu (từ vài phút đến vài giờ) và phát sinh chi phí truy xuất cao khi đọc dữ liệu.",
        "explanation": "Storage Tiering phân tách theo tần suất sử dụng. Dữ liệu báo cáo hàng ngày nếu để ở Glacier sẽ làm tê liệt hoạt động phân tích do phải chờ giải nén và tốn thêm tiền đọc dữ liệu (Data Retrieval Cost). Glacier chỉ phù hợp cho dữ liệu sao lưu lưu trữ pháp lý hiếm khi xem lại.",
        "eli5": "Giống như gửi đồ vào kho gửi đồ cách xa thành phố 100km: tiền gửi hàng tháng rất rẻ, nhưng mỗi lần muốn lấy đồ phải lái xe 3 tiếng và trả tiền phí cầu đường.",
        "commonMistakes": ["Nghĩ rằng tầng lưu trữ rẻ nhất luôn là lựa chọn tốt nhất cho mọi loại dữ liệu."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q40",
        "number": "C1.40",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Cơ chế Bucket Policies trên Cloud Object Storage đóng vai trò gì trong kiến trúc bảo mật?",
        "answer": "Quy định và kiểm soát quyền truy cập chi tiết áp dụng cho toàn bộ Data Container / Bucket từ các nguồn bên ngoài.",
        "explanation": "Đây là câu hỏi số 5 trong đề cương thi. Khác với IAM Policies (gắn vào người dùng nội bộ), Bucket Policy là chính sách dạng JSON gắn trực tiếp vào Bucket để cho phép hoặc từ chối truy cập dựa trên địa chỉ IP, dải mạng VPC, hoặc tài khoản AWS đối tác.",
        "eli5": "Giống như bảng nội quy treo ngay trước cổng tòa nhà: 'Chỉ nhân viên có thẻ xanh hoặc khách có giấy hẹn trước mới được phép bước vào cổng này'.",
        "commonMistakes": ["Nhầm Bucket Policies với IAM Policies; IAM gắn vào User/Role, Bucket Policy gắn vào bản thân Bucket."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q41",
        "number": "C1.41",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tính năng Object Lock (WORM) trên Cloud Object Storage được sử dụng nhằm mục đích gì?",
        "answer": "Thực thi mô hình Write Once, Read Many – ngăn chặn tuyệt đối việc xóa hoặc sửa đổi file trong khoảng thời gian quy định nhằm tuân thủ pháp lý.",
        "explanation": "Nhiều ngành như ngân hàng, y tế, chứng khoán (SEC Rule 17a-4) bắt buộc dữ liệu giao dịch hoặc hồ sơ bệnh án không được phép thay đổi hay xóa trong 5-10 năm, kể cả tài khoản quản trị tối cao (Root account) cũng không thể can thiệp được.",
        "eli5": "Giống như việc khắc chữ lên đá hoa cương: một khi đã khắc xuống thì không ai có thể tẩy xóa hay sửa lại một nét chữ nào nữa.",
        "commonMistakes": ["Nghĩ rằng tài khoản Admin có thể tắt Object Lock bất cứ lúc nào; ở chế độ Compliance Mode thì Admin cũng không tắt được."],
        "needsSlideCheck": false
    },

    # --- LESSON 8: Tách rời Compute & Storage (Slide 38-41) ---
    {
        "id": "ch1_q42",
        "number": "C1.42",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Điểm khác biệt cốt lõi giữa mô hình Coupled truyền thống và Decoupled hiện đại là gì?",
        "answer": "Coupled gắn chặt CPU và ổ đĩa trên một máy chủ, trong khi Decoupled tách rời tài nguyên tính toán và lưu trữ thành hai tầng độc lập.",
        "explanation": "Mô hình Decoupled cho phép mở rộng (Scale) tính toán và lưu trữ hoàn toàn độc lập với nhau theo nhu cầu thực tế, không gây lãng phí tài nguyên và chi phí.",
        "eli5": "Coupled giống như chiếc điện thoại liền pin và bộ nhớ: muốn đổi chip xử lý mạnh hơn bạn phải vứt cả máy đi mua máy mới; Decoupled giống như máy tính PC có thể thay thanh RAM hay cắm thêm ổ cứng rời bất cứ lúc nào.",
        "commonMistakes": ["Cho rằng Decoupled làm giảm tốc độ truy vấn vì dữ liệu phải truyền qua mạng; Caching NVMe đã khắc phục hoàn toàn nhược điểm này."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q43",
        "number": "C1.43",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Khái niệm 'Ephemeral Compute Clusters' trong kiến trúc Decoupled nghĩa là gì?",
        "answer": "Các cụm máy ảo tính toán chỉ tồn tại tạm thời trong thời gian xử lý tác vụ và tự động giải phóng (tắt) khi hoàn thành.",
        "explanation": "Thay vì phải thuê và duy trì các máy chủ hoạt động 24/7 lãng phí, Ephemeral Clusters cho phép bật lên 100 CPU trong 10 phút để xử lý một báo cáo phức tạp rồi hủy ngay lập tức, chỉ tính tiền đúng 10 phút đó.",
        "eli5": "Giống như thuê đội bốc vác thời vụ: khi xe container tới thì gọi 20 người tới bốc hàng trong 1 tiếng rồi trả lương theo giờ và giải tán.",
        "commonMistakes": ["Nghĩ rằng Ephemeral làm mất dữ liệu; dữ liệu luôn được lưu an toàn tại tầng Storage trung tâm."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q44",
        "number": "C1.44",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Cơ chế Predicate Pushdown trong kiến trúc tách rời Compute và Storage mang lại lợi ích gì?",
        "answer": "Đẩy các điều kiện lọc xuống tầng lưu trữ, chỉ tải về Compute những cột và dòng dữ liệu cần thiết, giảm tải tối đa băng thông mạng.",
        "explanation": "Nếu bảng có 100 triệu dòng và 50 cột, nhưng câu truy vấn chỉ cần 2 cột và 100 dòng thỏa mãn điều kiện `WHERE`, Predicate Pushdown giúp cụm Compute không phải kéo toàn bộ bảng qua mạng mà chỉ nhận về đúng 100 dòng đó.",
        "eli5": "Bạn gọi điện nhờ mẹ lấy quyển vở màu xanh ở ngăn trên cùng: mẹ lọc đúng quyển đó gửi cho bạn, thay vì phải chuyển cả cái giá sách nặng 50kg đến trường.",
        "commonMistakes": ["Nghĩ rằng Predicate Pushdown thực hiện toàn bộ câu lệnh SQL; nó chỉ lọc và chiếu (Filter & Projection)."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q45",
        "number": "C1.45",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Trong kiến trúc 3 tầng của Snowflake, tầng Query Processing giải quyết bài toán tranh chấp tài nguyên như thế nào?",
        "answer": "Cho phép tạo nhiều Virtual Warehouses độc lập cùng truy cập kho dữ liệu trung tâm mà không bao giờ tranh chấp tài nguyên tính toán của nhau.",
        "explanation": "Trong hệ thống cũ, nếu phòng Marketing chạy truy vấn nặng quét cả triệu dòng, giám đốc mở Dashboard tài chính sẽ bị quay vòng tròn chờ đợi. Với Snowflake, mỗi phòng ban dùng một Virtual Warehouse riêng biệt với CPU/RAM độc lập hoàn toàn.",
        "eli5": "Nhiều người cùng đọc một cuốn sách giáo khoa trên mạng từ các máy tính khác nhau: bạn đọc nhanh hay chậm không làm máy tính của người bên cạnh bị lag.",
        "commonMistakes": ["Nghĩ rằng tạo nhiều Virtual Warehouse sẽ nhân bản dữ liệu nhiều lần; dữ liệu lưu trữ trung tâm chỉ có duy nhất một bản."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q46",
        "number": "C1.46",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tính năng Secure Data Sharing trong kiến trúc Modern DWH thay thế phương pháp chia sẻ dữ liệu truyền thống ra sao?",
        "answer": "Cấp quyền đọc trực tiếp trên tầng lưu trữ cho đối tác bằng metadata mà không cần sao chép, trích xuất dữ liệu thành file hay truyền qua FTP.",
        "explanation": "Phương pháp truyền thống (xuất CSV gửi qua email/FTP) tiềm ẩn nguy cơ lộ lọt dữ liệu và dữ liệu bị cũ ngay khi xuất. Secure Data Sharing cho phép đối tác truy vấn dữ liệu thời gian thực được phân quyền ngay trong tài khoản Snowflake của họ mà không tốn chi phí lưu trữ thêm.",
        "eli5": "Giống như cấp quyền 'Chỉ xem' vào file Google Sheet cho đối tác: họ xem số liệu mới nhất trực tiếp mà bạn không phải xuất file Excel đính kèm email.",
        "commonMistakes": ["Nghĩ rằng Data Sharing cho phép đối tác sửa hoặc xóa dữ liệu của mình; quyền truy cập chia sẻ chỉ là Read-only an toàn."],
        "needsSlideCheck": false
    },
    {
        "id": "ch1_q47",
        "number": "C1.47",
        "chapterId": "ch1",
        "topic": "modern-dw",
        "type": "theory",
        "prompt": "Tại sao kiến trúc tách rời Compute và Storage lại đặc biệt phù hợp cho các tác vụ huấn luyện mô hình Trí tuệ Nhân tạo (AI/ML)?",
        "answer": "Cho phép thuê cụm máy tính toán gắn GPU cấu hình cực mạnh chỉ trong vài giờ để huấn luyện mô hình rồi giải phóng, tối ưu chi phí tối đa.",
        "explanation": "Huấn luyện AI cần sức mạnh tính toán khổng lồ nhưng không liên tục. Mô hình tách rời cho phép các nhà khoa học dữ liệu đọc trực tiếp dữ liệu sạch từ S3 vào cụm GPU tạm thời, huấn luyện xong tắt máy, tiết kiệm hàng trăm triệu đồng so với việc mua phần cứng GPU chuyên dụng để không.",
        "eli5": "Khi cần xây nhà bạn thuê xe ủi đất trong 2 ngày; san phẳng mặt bằng xong thì trả xe, không dại gì bỏ tiền mua luôn chiếc xe ủi về để trong sân.",
        "commonMistakes": ["Nghĩ rằng huấn luyện AI bắt buộc phải đầu tư cụm máy chủ GPU vật lý đặt tại văn phòng."],
        "needsSlideCheck": false
    }
]

# Load current questions
with open('src/data/questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Keep original questions (and remove any previously generated ch1_ questions if any)
original_questions = [q for q in questions if not q['id'].startswith('ch1_')]

# Append new questions
combined_questions = original_questions + new_questions

with open('src/data/questions.json', 'w', encoding='utf-8') as f:
    json.dump(combined_questions, f, ensure_ascii=False, indent=2)

print(f"Updated questions.json! Original: {len(original_questions)}, Added: {len(new_questions)}, Total: {len(combined_questions)}")

# Now update chapters.json to link these questions into each lesson's miniQuiz and relatedQuestionIds
with open('src/data/chapters.json', 'r', encoding='utf-8') as f:
    chapters = json.load(f)

# Mapping of lesson index (0 to 7) to question IDs
lesson_q_map = [
    # Les 1-1 (RDBMS -> AI-Native): C1.1 -> C1.8 + q1
    ["ch1_q01", "ch1_q02", "ch1_q03", "ch1_q04", "ch1_q05", "ch1_q06", "ch1_q07", "ch1_q08", "q1"],
    # Les 1-2 (Cloud DWH & Cost): C1.9 -> C1.16 + q1, q2
    ["ch1_q09", "ch1_q10", "ch1_q11", "ch1_q12", "ch1_q13", "ch1_q14", "ch1_q15", "ch1_q16", "q1", "q2"],
    # Les 1-3 (Data Fabric): C1.17 -> C1.22 + q3, q4
    ["ch1_q17", "ch1_q18", "ch1_q19", "ch1_q20", "ch1_q21", "ch1_q22", "q3", "q4"],
    # Les 1-4 (Data Mesh): C1.23 -> C1.27
    ["ch1_q23", "ch1_q24", "ch1_q25", "ch1_q26", "ch1_q27"],
    # Les 1-5 (Lakehouse & Medallion): C1.28 -> C1.33
    ["ch1_q28", "ch1_q29", "ch1_q30", "ch1_q31", "ch1_q32", "ch1_q33"],
    # Les 1-6 (So sánh Mesh/Fabric/Lakehouse): C1.34 -> C1.36
    ["ch1_q34", "ch1_q35", "ch1_q36"],
    # Les 1-7 (Cloud Object Storage): C1.37 -> C1.41 + q5
    ["ch1_q37", "ch1_q38", "ch1_q39", "ch1_q40", "ch1_q41", "q5"],
    # Les 1-8 (Decoupling Compute/Storage): C1.42 -> C1.47 + q1, q2
    ["ch1_q42", "ch1_q43", "ch1_q44", "ch1_q45", "ch1_q46", "ch1_q47", "q1", "q2"],
]

for idx, q_list in enumerate(lesson_q_map):
    chapters[0]['lessons'][idx]['miniQuiz'] = q_list[:4] # 4 questions for mini quiz
    chapters[0]['lessons'][idx]['relatedQuestionIds'] = q_list

with open('src/data/chapters.json', 'w', encoding='utf-8') as f:
    json.dump(chapters, f, ensure_ascii=False, indent=2)

print("Updated chapters.json with question mappings for all 8 lessons!")
