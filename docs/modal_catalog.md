## MODAL CATALOG

| Code | Tên Modal | Loại | Dùng tại | Điều kiện hiện | Điều kiện đóng |
| --- | --- | --- | --- | --- | --- |
| MDL-01 | Terms of Service | Modal (thường) | UC_1.2 | User click link "Terms of Service" | User đóng thủ công; không mất dữ liệu form phía sau |
| MDL-02 | Processing Overlay | Modal (blocking) | UC_7.1, UC_8.1 | Ngay sau khi bấm CTA thanh toán | Tự đóng khi có kết quả (→ MDL-03 hoặc banner lỗi) |
| MDL-03 | Success Confirmation | Modal (auto-dismiss) | UC_7.1, UC_8.1 | Thanh toán thành công | Tự đóng sau ~2 giây, chuyển sang UC_8.2 |
| MDL-04 | Email Lock | Modal (blocking, đếm ngược 15 phút) | UC_7.1, UC_8.1 | 5 lần thanh toán thất bại liên tiếp | Hết 15 phút |
| MDL-05 | Account Creation Failure | Modal | UC_8.3 | Backend đã tự thử lại hết số lần cho phép mà vẫn lỗi | User đóng và liên hệ support |
| MDL-06 | "Setting up your trading floor" Interstitial | Modal (animated, chỉ hiển thị) | UC_8.3 | Ngay sau khi Account Claim (UC_8.2) thành công | Tự chuyển sang màn hình login; nếu lỗi → MDL-05 |
| MDL-07 | Link Expired | Modal (thay thế form) | UC_8.2 | JWT trong link kích hoạt đã hết hạn (quá 48h) | User bấm [Resend link] → nhận email mới (MSG-27) |

---