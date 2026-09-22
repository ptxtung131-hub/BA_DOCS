## COMMON RULES

| Code | Tên | Nội dung |
| --- | --- | --- |
| **CR-01** | Dropdown Display Behavior | Mọi dropdown phải hiển thị placeholder rõ ràng (vd. "Select primary market") thay vì tự chọn sẵn option đầu tiên. Không có lựa chọn mặc định trừ khi có rule riêng nói khác (vd. platform tự chọn khi chỉ có 1 kết quả — `BR_4.2`). |
| **CR-02** | Email Field Validation | Email là bắt buộc, phải đúng định dạng chuẩn, báo lỗi inline ngay khi rời field nếu sai định dạng. |
| **CR-03** | Required Text Field Validation | Text field bắt buộc phải báo lỗi inline nếu để trống khi submit; không chặn nhập liệu, chỉ chặn submit. |
| **CR-04** | Monetary Value Display Format | Mọi giá trị tiền tệ hiển thị dạng `$X,XXX.XX` — luôn có ký hiệu `$`, dấu phẩy ngăn cách hàng nghìn, 2 chữ số thập phân. Số âm (discount) hiển thị dạng `−$XX.XX`. |
| **CR-05** | Campaign / UTM Parameter Capture & Persistence | Tham số UTM trên URL chỉ được đọc **một lần** khi user vào trang lần đầu, lưu vào `localStorage`, và được tái sử dụng ở mọi bước gửi request sau đó (Step 5, Step 7) — không parse lại từ URL mỗi lần. |
| **CR-06** | Submit Button State During Async Request | Bất kỳ button nào kích hoạt gọi API đều phải: disable ngay khi click → hiện trạng thái xử lý → chỉ re-enable khi có kết quả rõ ràng (thành công hoặc thất bại). Mục đích: chống submit trùng. |
| **CR-07** | Step Data Persistence on Back-Navigation | Dữ liệu đã nhập ở một bước phải được giữ nguyên nếu user quay lại bước đó sau này trong cùng phiên — chỉ mất khi refresh toàn trang. Ngoại lệ: nếu một lựa chọn ở bước trước đó thay đổi và bước sau phụ thuộc vào nó, bước sau phải reset theo rule riêng (vd. `BR_2.3`). |
| **CR-08** | Conditional / Cascading Field Display (Address Fields) | Field địa chỉ có thể ẩn/hiện hoặc phụ thuộc lẫn nhau theo lựa chọn trước đó: State/Region ẩn nếu quốc gia không có vùng con; City chỉ hiện sau khi chọn Region và luôn refetch theo Region đã chọn; ZIP ẩn/hiện theo từng quốc gia. |
| **CR-09** | Immediate vs. Deferred Validation Timing | Có 2 loại kiểm tra khác nhau về thời điểm chạy: (a) kiểm tra rẻ/tại chỗ (vd. sanctions pre-check) chạy **ngay lập tức** mỗi khi field thay đổi; (b) kiểm tra tốn kém/gọi dịch vụ ngoài (vd. tính thuế) chỉ chạy **một lần duy nhất** khi user bấm nút submit của bước đó. |
| **CR-10** | Secure Payment Field Handling | Các field nhạy cảm liên quan thẻ thanh toán (số thẻ, ngày hết hạn, CVC) bắt buộc dùng hosted field/iframe do cổng thanh toán cung cấp — tuyệt đối không dùng input HTML thường. |
| **CR-11** | Raw Gateway Error Passthrough (Payment Failures Only) | Khi thanh toán thất bại, hiển thị nguyên văn lý do trả về từ cổng thanh toán — không viết lại thành thông báo chung chung — để user có thông tin cụ thể để xử lý. |
| **CR-12** | Anti-Enumeration Response for Public Email-Based Actions | Bất kỳ endpoint công khai (không cần đăng nhập) nào thao tác theo địa chỉ email đều phải trả về **cùng một phản hồi** dù email đó có tồn tại trong hệ thống hay không. |
| **CR-13** | Background Result Listening for Asynchronous Payment Confirmation | Nếu user đóng/rời khỏi giao diện đang chờ xác nhận thanh toán không đồng bộ trước khi có kết quả, hệ thống vẫn phải tiếp tục lắng nghe kết quả ở nền — không được huỷ giao dịch chỉ vì user rời màn hình. |

---