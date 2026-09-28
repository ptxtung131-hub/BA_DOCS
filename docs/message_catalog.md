## MESSAGE CATALOG

> Re-issued with `UC_main_ver_3.md`. Thêm `MSG-29`, `MSG-30`, `MSG-31`; thêm cột **Component** (mã popup/modal/full-page tương ứng) và **Dùng tại**. Câu chữ EN/VN của MSG-01…MSG-28 giữ nguyên.
> **Trạng thái:** ✅ = đã có trong spec gốc · 📝 DRAFT = câu chữ do BA đề xuất, cần copywriter/BAL duyệt.

| Code | Type | Component | Dùng tại | Message (EN) | Message (VN) |
| --- | --- | --- | --- | --- | --- |
| MSG-01 | Toast | — | UC_1.1 EX-1 | We couldn't load checkout right now. Please refresh the page. | Không thể tải trang thanh toán. Vui lòng tải lại trang. |
| MSG-02 | Full-page Error | FPS-02 | UC_1.1 EX-2 | Something went wrong on our end. Please try again in a few minutes. | Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút. |
| MSG-03 | Popup (Success) | POP-04 | UC_1.3 | You're on the list! We'll email you as soon as spots open up. | Bạn đã vào danh sách chờ! Chúng tôi sẽ email khi có suất trống. |
| MSG-04 | Error (Banner) | — | UC_1.3 EX-1 | We couldn't add you to the waitlist. Please try again. | Không thể thêm bạn vào danh sách chờ. Vui lòng thử lại. |
| MSG-05 | Full-page Error | FPS-01 | UC_1.4 | Service Unavailable — Stack Trading's evaluation services are not available in your region due to regulatory restrictions. We are unable to process registrations or accept payments from your current location. If you believe this is an error, please contact `support@stacktrading.com` with your location details. | Dịch vụ không khả dụng — Stack Trading hiện không cung cấp dịch vụ đánh giá tại khu vực của bạn do hạn chế quy định. Chúng tôi không thể xử lý đăng ký hoặc thanh toán từ vị trí hiện tại của bạn. Nếu bạn cho rằng đây là nhầm lẫn, vui lòng liên hệ `support@stacktrading.com` kèm thông tin vị trí. |
| MSG-06 | Popup | POP-02 | UC_1.5 EX-1, UC_7.5 EX-6, UC_8.1 EX-6 | Prices may have changed since you last viewed this page. Please review your order before continuing. | Giá có thể đã thay đổi kể từ lần bạn xem gần nhất. Vui lòng kiểm tra lại đơn hàng trước khi tiếp tục. |
| MSG-07 | Popup | POP-01 | UC_4 EX-1 | No trading platforms are currently available for this asset class. Please try again later or contact support. | Hiện không có nền tảng giao dịch nào khả dụng cho loại tài sản này. Vui lòng thử lại sau hoặc liên hệ hỗ trợ. |
| MSG-08 | Full-page Error | FPS-02 | UC_4 EX-2 | Something went wrong loading platform options. Please try again in a few minutes. | Đã có lỗi khi tải danh sách nền tảng. Vui lòng thử lại sau ít phút. |
| MSG-09 | Full-page Error | FPS-02 | UC_5 EX-1 | Something went wrong loading market data options. Please try again in a few minutes. | Đã có lỗi khi tải danh sách gói dữ liệu thị trường. Vui lòng thử lại sau ít phút. |
| MSG-10 | Inline Validation | — | UC_6.1 EX-1, EX-2, EX-3 | Stack Trading is unable to accept clients from the selected country or region at this time. | Stack Trading hiện không thể nhận khách hàng từ quốc gia hoặc khu vực đã chọn. |
| MSG-11 | Inline Validation | — | UC_6.1 EX-4 | We couldn't verify this address. Please check and try again. | Không thể xác minh địa chỉ này. Vui lòng kiểm tra và thử lại. |
| MSG-12 | Full-page Error | FPS-02 | UC_6.1 EX-5 | Something went wrong calculating your order. Please try again in a few minutes. | Đã có lỗi khi tính toán đơn hàng. Vui lòng thử lại sau ít phút. |
| MSG-13 | Popup (blocking) | POP-03 | UC_7.1 EX-1 | No payment methods are currently available for your region. Please contact support. | Hiện không có phương thức thanh toán nào khả dụng cho khu vực của bạn. Vui lòng liên hệ hỗ trợ. |
| MSG-14 | Modal (blocking, countdown) | MDL-04 | UC_7.1 EX-2, UC_8.1 EX-5 | For your security, we've temporarily paused new payment attempts on this account. Please try again in 15 minutes. | Vì lý do bảo mật, chúng tôi tạm dừng các lần thử thanh toán mới trên tài khoản này. Vui lòng thử lại sau 15 phút. |
| MSG-15 | Modal (blocking, processing) | MDL-02 | UC_8.1 | Please do not refresh the page or click the back button. This may take a few moments. | Vui lòng không tải lại trang hoặc bấm nút quay lại. Quá trình này có thể mất vài giây. |
| MSG-16 | Modal (success, auto-dismiss ~2s) | MDL-03 | UC_8.1 | Payment successful! | Thanh toán thành công! |
| MSG-17 | Inline (success) | — | UC_7.5 | Promo code applied. | Đã áp dụng mã giảm giá. |
| MSG-18 | Inline (error) | — | UC_7.5 EX-1 | This promo code is invalid or has expired. | Mã giảm giá này không hợp lệ hoặc đã hết hạn. |
| MSG-19 | Inline (error) | — | UC_7.5 EX-2 | You've already used this promo code. | Bạn đã sử dụng mã giảm giá này rồi. |
| MSG-20 | Banner (error) | — | UC_7.5 EX-5, UC_8.1 EX-7 | This promo code is no longer valid. It has been removed from your order. | Mã giảm giá này không còn hiệu lực. Đã được gỡ khỏi đơn hàng của bạn. |
| MSG-21 | Inline (error) | — | UC_7.5 EX-3 | This promo code isn't valid for the selected package. | Mã giảm giá này không áp dụng cho gói bạn đã chọn. |
| MSG-22 | Banner (error) | — | UC_8.1 EX-2 | Payment session expired. If you already submitted your payment, please check your email for confirmation. If you have not paid yet, please try again. | Phiên thanh toán đã hết hạn. Nếu bạn đã gửi thanh toán, vui lòng kiểm tra email xác nhận. Nếu chưa thanh toán, vui lòng thử lại. |
| MSG-23 | Banner (error) | — | UC_8.1 EX-3 | It looks like this order has already been paid for. Please check your email for your account details. | Có vẻ đơn hàng này đã được thanh toán. Vui lòng kiểm tra email để lấy thông tin tài khoản. |
| MSG-24 | Banner (error) | — | UC_8.1 EX-4 | We noticed a duplicate charge on your order. Our team has been notified and will reach out to resolve this. | Chúng tôi phát hiện đơn hàng bị tính phí trùng. Đội ngũ hỗ trợ đã được thông báo và sẽ liên hệ để xử lý. |
| MSG-25 | Full-page (info) | FPS-03 | UC_8.1 EX-8 | Your payment is being refunded due to a regional restriction. This process may take a few business days. | Khoản thanh toán của bạn đang được hoàn trả do hạn chế khu vực. Quá trình này có thể mất vài ngày làm việc. |
| MSG-26 | Full-page (info) | FPS-04 | UC_8.1 EX-8 | Your refund has been completed. Please allow a few business days for the funds to appear in your account. | Khoản hoàn tiền của bạn đã hoàn tất. Vui lòng chờ vài ngày làm việc để tiền về tài khoản. |
| MSG-27 | Email | MDL-07 (nút [Resend link]) | UC_8.2 AF-2 | Subject: Your activation link — Here's your new link to activate your Stack Trading account: [link]. This link expires in 48 hours. | Tiêu đề: Link kích hoạt của bạn — Đây là link kích hoạt tài khoản Stack Trading mới của bạn: [link]. Link có hiệu lực trong 48 giờ. |
| MSG-28 | Modal | MDL-05 | UC_8.3 EX-1 | We're having trouble setting up your account. Please contact support so we can help. | Chúng tôi gặp sự cố khi thiết lập tài khoản của bạn. Vui lòng liên hệ hỗ trợ để được trợ giúp. |
| MSG-29 ✅ | Inline (static, in-flight) | — | UC_6.1 (main step 9, §9.2 row 11) | Calculating regional taxes... | Đang tính thuế theo khu vực... |
| MSG-30 📝 DRAFT | Inline Validation | — | UC_6.1 EX-6 (PND-11) | Email addresses don't match. Please check and try again. | Email xác nhận không khớp. Vui lòng kiểm tra và thử lại. |
| MSG-31 📝 DRAFT | Inline (error) | — | UC_7.5 EX-4 (PND-12) | We couldn't apply your promo code right now. Please try again. | Không thể áp dụng mã giảm giá lúc này. Vui lòng thử lại. |

> **Ghi chú:**
> - `MSG-29` xuất hiện trong ver_2 kèm câu chữ "Calculating regional taxes..." (lấy từ spec gốc UC_6.1); bản VN là đề xuất dịch.
> - `MSG-30`, `MSG-31`: câu chữ **do BA soạn tạm** vì spec chưa có; đổi nội dung không ảnh hưởng logic (PND-11, PND-12).
> - Catalog hiện chỉ có EN/VN; Flow D (Quebec) yêu cầu **toàn bộ** UI bằng tiếng Pháp nhưng chưa có cột FR — PND-26.
> - Lỗi thanh toán bị từ chối (decline) hiển thị **nguyên văn từ gateway** (`CR-11`) nên không có mã MSG riêng.

---
