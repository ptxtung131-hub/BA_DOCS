## FULL-PAGE STATE CATALOG

> Re-issued with `UC_main_ver_3.md`. Nội dung mapping không đổi; thêm cột Ghi chú.

| Code | Tên | Dùng tại | Message | Ghi chú / PND |
| --- | --- | --- | --- | --- |
| FPS-01 | Region Block / Service Unavailable | UC_1.4 | MSG-05 | Dead end. ⚠️ PND-24: spec vừa nói "chỉ có message, không link" vừa có nút Return to homepage; và 403 vs JSON `geo_blocked`. Chỉ dựa trên IP — PND-25. |
| FPS-02 | Generic System Error | UC_1.1, UC_4, UC_5, UC_6.1 | MSG-02, MSG-08, MSG-09, MSG-12 | Cùng một component, 4 câu chữ theo ngữ cảnh: khởi tạo (MSG-02), tải platform (MSG-08), tải market data (MSG-09), tính đơn hàng (MSG-12). |
| FPS-03 | Refund In Progress | UC_8.1 EX-8 | MSG-25 | Sau thanh toán, khi phát hiện vùng bị hạn chế. ⚠️ PND-05. |
| FPS-04 | Refund Completed | UC_8.1 EX-8 | MSG-26 | Trạng thái kế tiếp của FPS-03. |

---
