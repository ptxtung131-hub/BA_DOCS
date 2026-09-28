## POPUP CATALOG

> Re-issued with `UC_main_ver_3.md`. Thêm `POP-03`, `POP-04`; mở rộng nơi dùng của `POP-02`.
> Quy ước: **Popup** = thông báo chặn/không chặn ngắn (Alert). **Modal** có nội dung/hành vi riêng → xem `modal_catalog.md`.

| Code | Tên Popup | Dùng tại | Message | Điều kiện hiện | Ghi chú / PND |
| --- | --- | --- | --- | --- | --- |
| POP-01 | No Platforms Available | UC_4 (Step 3) | MSG-07 | Danh sách platform trả về rỗng | ⚠️ PND-28: chưa định nghĩa user làm gì tiếp (đóng / Back / đổi asset class). Khác với Step 4 (rỗng = lỗi full-page FPS-02). |
| POP-02 | Price Changed | UC_1.5, UC_7.5 EX-6, UC_8.1 EX-6 | MSG-06 | Giá thay đổi giữa lúc user xem và lúc thanh toán (`PRICE_CHANGED`) | Nút [Refresh now] đóng overlay + làm mới Order Summary, **không** reload trang (`BR_1.5.2`). |
| POP-03 🆕 | No Payment Methods Available | UC_7.1 EX-1 | MSG-13 | `methods[]` rỗng | Blocking — user không thể tiếp tục. Mã này được ver_2 dùng nhưng chưa có trong catalog cũ. |
| POP-04 🆕 | Waitlist Joined | UC_1.3 | MSG-03 | Cả 2 lời gọi CRM (Klaviyo + ActiveCampaign) thành công | Chứa [Return to Homepage]. Bổ sung để mọi MSG kiểu Popup đều có mã component. |

---
