## MODAL CATALOG

> Re-issued with `UC_main_ver_3.md`. Cột **Dùng tại** được sửa theo cách ver_2 dùng thực tế; thêm cột **Ghi chú / PND**.

| Code | Tên Modal | Loại | Dùng tại | Điều kiện hiện | Điều kiện đóng | Ghi chú / PND |
| --- | --- | --- | --- | --- | --- | --- |
| MDL-01 | Terms of Service | Modal (thường) | UC_1.2 (checkbox 2, hiển thị ở Step 5 / UC_6.1) | User click link "Terms of Service" | User đóng thủ công; không mất dữ liệu form phía sau | Nội dung = trang public `/terms`. |
| MDL-02 | Processing Overlay | Modal (blocking) | UC_7.3, UC_7.4, UC_8.1 (CC đi qua UC_8.1) | Ngay sau khi bấm CTA thanh toán | Tự đóng khi có kết quả (→ MDL-03 hoặc banner lỗi) | Text `MSG-15`. Tự tắt sau timeout FE 10 phút → `MSG-22` (UC_8.1 EX-2). |
| MDL-03 | Success Confirmation | Modal (auto-dismiss) | UC_8.1 | Thanh toán thành công | Tự đóng sau ~2 giây, chuyển sang UC_8.2 | Text `MSG-16`. ⚠️ PND-10: cơ chế chuyển sang UC_8.2 (UC_8.2 chỉ kích hoạt bằng link trong Email 2). |
| MDL-04 | Email Lock | Modal (blocking, đếm ngược 15 phút) | UC_7.1 (mọi lần mount), UC_8.1 | 5 lần thanh toán thất bại liên tiếp | Hết 15 phút | Text `MSG-14`. Mọi input bên dưới bị disable. Câu hỏi mở: `Q-E22`. |
| MDL-05 | Account Creation Failure | Modal | UC_8.3 | Backend đã tự thử lại hết số lần cho phép mà vẫn lỗi | User đóng và liên hệ support | Text `MSG-28`. Số lần retry chưa xác định — PND-07. Reload sau khi đóng: `Q-E27`. |
| MDL-06 | "Setting up your trading floor" Interstitial | Modal (animated, chỉ hiển thị) | UC_8.3 | Ngay sau khi Account Claim (UC_8.2) thành công | Tự chuyển sang màn hình login; nếu lỗi → MDL-05 | 4 bước animation, nhãn chưa chốt — PND-08. Không có timeout FE (`BR_8.3.1`). |
| MDL-07 | Link Expired | Modal (thay thế form) | UC_8.2 | JWT trong link kích hoạt đã hết hạn (quá 48h) | User bấm [Resend link] → nhận email mới (MSG-27) | Endpoint `POST /public/resend-activation-link` luôn trả HTTP 200 (`CR-12`). |

---
