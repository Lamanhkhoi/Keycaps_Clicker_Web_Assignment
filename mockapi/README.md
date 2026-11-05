# MockAPI — dữ liệu mẫu cho PixelStore

Dữ liệu game lấy từ Steam Store API (tên, giá USD, giảm giá, nhà phát triển, ngày phát hành, lượt đánh giá) tại thời điểm tạo file; **giá và % giảm sẽ lệch theo thời gian**. Ảnh dùng link `header.jpg` của Steam CDN. Mô tả tiếng Việt do mình viết. Chỉ dùng cho bài tập.

## File

| File | Nội dung |
|---|---|
| `games.json` | 40 game |
| `orders.json` | 5 bản ghi mẫu: 3 đơn `purchase` + 2 yêu cầu `request` |
| `seed.mjs` | Script đẩy 2 file trên lên MockAPI |

## 2 resource (gộp để hợp với gói free)

Gói free của MockAPI giới hạn số project/resource (có nguồn ghi 2 resource, có nguồn ghi nhiều hơn — **kiểm tra trên dashboard của bạn**), nên chỉ dùng 2 resource.

### `games`
| Field | Kiểu | Ví dụ |
|---|---|---|
| name | String | "Elden Ring" |
| genre | String | "RPG" (Action, Adventure, RPG, Strategy, Simulation, Casual) |
| tags | Array | ["Action", "RPG"] |
| price | Number | 59.99 (USD, giá gốc; 0 = Free) |
| discount | Number | 75 (đơn vị %) |
| image | String | URL ảnh |
| description | String | |
| developer | String | |
| releaseDate | String | "2022-02-24" |
| recommendations | Number | lượt đánh giá (dùng để sort "Phổ biến") |
| featured | Boolean | hiện ở trang chủ |
| steamAppId | Number | |

### `orders` (2 loại, phân biệt bằng `type`)
- `type: "purchase"` → customerName, email, items (Array of {gameId, name, price, qty}), total, status, createdAt
- `type: "request"` → customerName, email, gameName, note, status, createdAt

## Cách nạp

1. Trên mockapi.io: tạo project → tạo resource `games` và `orders`. Thêm các field như bảng trên (hoặc để MockAPI tự nhận khi POST lần đầu — tùy giao diện).
2. **Xoá hết record giả** MockAPI tự sinh (mặc định hay có ~10 record mỗi resource).
3. Chạy ở thư mục gốc project (Node 18+, không cần cài thêm gì):
   ```
   node mockapi/seed.mjs https://<project-secret>.mockapi.io
   ```
   Script tự dừng nếu resource chưa rỗng. Nó POST 45 request.
4. Dán Base URL vào `src/config.js` (`API_URL`).

Không dùng script được thì dán tay từng game từ `games.json` vào dashboard; khi đó nhớ `gameId` trong đơn mẫu phải khớp `id` thật của game.
