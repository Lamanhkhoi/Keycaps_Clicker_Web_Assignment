# NOTES – Tính năng → Kiến thức → File (chuẩn bị Q&A FER202)

> File này cập nhật sau MỖI bước. Cột "File" là dự kiến, sẽ sửa lại cho đúng khi code xong.
> Cột "Q&A" là câu thầy có thể hỏi. Tự trả lời thành tiếng trước khi demo.

## Quyết định đã chốt
- **Đổi đề tài (chủ đề tự do): web bán game kiểu Steam** (thay cho keycaps/clickers). Game = sản phẩm, thể loại = lọc, "Yêu cầu thêm game" = thay form custom.
- Stack: Vite + React (JavaScript), react-router-dom, bootstrap + react-bootstrap, formik + yup. (Đã xác nhận: lớp học hết các phần này.)
- Dữ liệu: **MockAPI**, 2 resource `games` và `orders` (xem `mockapi/README.md`). Gọi API bằng `axios` (.then/.catch/.finally) trong `useEffect`, gom ở `src/api/gameApi.js`.
- Ảnh: link Steam CDN lưu trong field `image` của MockAPI.
- Tên shop tạm "PixelStore" và `API_URL`: đặt ở MỘT chỗ (`src/config.js`).
- Giao diện: màu/font gom vào MỘT file (`src/styles/theme.css`), chốt phong cách sau cũng không phải sửa component.
- Form: dùng `useFormik` + `Yup.object({...})` đúng như Exercise 12 (không dùng `<Formik>`/`<Field>`). Khuôn viết giống Lab4/5/6: initialValues + validationSchema để ngoài component, mỗi ô viết tay value/onChange/onBlur (đã bỏ FormField.jsx).
- Style code (đổi 11/2026): giống Lab6 — arrow function cho callback/hàm xử lý, component vẫn `function Ten()`, nháy đơn, không chấm phẩy.
- Router: viết kiểu slide `<BrowserRouter>` + `<Routes>` + `<Route>` + `<Link>`.

## KHÔNG dùng (vì chưa học / ngoài phạm vi) – để trả lời "sao em không dùng X?"
- Redux → đã có Context + useReducer là đủ cho giỏ hàng.
- Backend thật (Node/Express, Firebase…) → dùng MockAPI là đủ. Gọi API bằng `axios` (đã học ở EX_9/Lab6), thay cho `fetch` ban đầu.
- PropTypes, lazy/code-splitting → chưa học trên lớp.
- Tailwind, Next.js, TypeScript, UI kit khác → ngoài phạm vi.

## Bản đồ file hiện tại (khung sườn đã tạo, logic chính do Khôi tự code)
- Dữ liệu: `mockapi/games.json`, `mockapi/orders.json`, `mockapi/seed.mjs` (đã nạp lên MockAPI, app không đọc các file này)
- API: `src/api/gameApi.js` · giá: `src/utils/price.js`
- State: `src/reducers/cartReducer.js`, `src/reducers/filterReducer.js`, `src/context/CartContext.jsx` (giỏ hàng lưu localStorage bằng useEffect)
- Component: `AppNavbar`, `Footer`, `GameCard`, `GameGrid`, `PriceTag`, `FilterBar`, `CartItemRow`, `StatusMessage`, `GameForm`
- Trang: Home, Products, ProductDetail, Cart, Checkout, OrderSuccess, RequestGame (`/request`), Admin (`/admin`), NotFound
- Trạng thái: TẤT CẢ đã code xong và test trên trình duyệt (xem `VAN_DAP.md` để ôn). Bảng dưới là kế hoạch gốc.

## Bảng chính

| # | Tính năng | Kiến thức dùng | File (dự kiến) | Q&A có thể gặp | Xong |
|---|-----------|----------------|----------------|----------------|------|
| 0 | Khởi tạo project | Node/npm, tạo app React bằng Vite, Bootstrap + React-Bootstrap | `package.json`, `src/main.jsx` | Vì sao cần cả `bootstrap` và `react-bootstrap`? `main.jsx` làm gì? | ⬜ |
| 1 | Routing + Navbar + Footer + 404 | React Router: `BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation` | `src/App.jsx`, `src/components/AppNavbar.jsx`, `src/pages/NotFoundPage.jsx` | SPA khác web nhiều trang chỗ nào? Vì sao `Link` thay vì `<a>`? `path="*"` để làm gì? | ⬜ |
| 2 | Dữ liệu + ProductCard + trang danh mục | JSX, ES6 (`import/export`, `map`, destructuring), props, presentational vs container | `src/data/products.js`, `src/components/ProductCard.jsx`, `src/pages/ProductsPage.jsx` | `key` trong `.map()` để làm gì? Props có sửa được không? ProductCard là presentational hay container? | ⬜ |
| 3 | Trang chủ | JSX, props, `filter`/`slice` để lấy sản phẩm nổi bật, semantic HTML | `src/pages/HomePage.jsx` | Sản phẩm nổi bật lấy từ đâu? Vì sao dùng `<section>` thay vì `<div>`? | ⬜ |
| 4 | Lọc / sắp xếp / tìm kiếm | `useReducer` (bộ lọc nhiều trường), `useState` (ô tìm kiếm), controlled input | `src/pages/ProductsPage.jsx`, `src/components/FilterBar.jsx`, `src/reducers/filterReducer.js` | Vì sao filter dùng `useReducer` còn search dùng `useState`? Danh sách đã lọc có cần là state không? | ⬜ |
| 5 | Chi tiết sản phẩm `/products/:id` | `useParams`, `useNavigate`, conditional rendering | `src/pages/ProductDetailPage.jsx` | `id` lấy từ URL là string hay number? Id không tồn tại xử lý sao? `navigate(-1)` khác `navigate("/")` ra sao? | ⬜ |
| 6 | CartContext (ADD, REMOVE, UPDATE_QTY, CLEAR) | Context API, `useContext`, `useReducer` | `src/context/CartContext.jsx`, `src/main.jsx` | Context giải quyết vấn đề gì (prop drilling)? Vì sao reducer không được sửa state trực tiếp? | ⬜ |
| 7 | Lưu giỏ hàng vào localStorage | Custom hook, `useEffect` (dependency array) | `src/hooks/useLocalStorage.js` | `useEffect` chạy khi nào? `[]` khác `[cart]` thế nào? Custom hook khác hàm thường chỗ nào? | ⬜ |
| 8 | Trang giỏ hàng + badge trên Navbar | `useContext`, dữ liệu suy ra (tổng tiền, tổng số lượng), conditional rendering | `src/pages/CartPage.jsx`, `src/components/AppNavbar.jsx` | Tổng tiền có cần lưu vào state không? Giỏ trống hiển thị gì? | ⬜ |
| 9 | Trang đặt custom + preview | `useFormik` + Yup, controlled state cho preview | `src/pages/CustomOrderPage.jsx`, `src/components/CustomPreview.jsx`, `src/data/customOptions.js` | Validation chạy lúc nào? `touched` để làm gì? Preview cập nhật nhờ đâu? | ⬜ |
| 10 | Checkout giả lập + order-success | `useFormik` + Yup, `useNavigate` | `src/pages/CheckoutPage.jsx`, `src/pages/OrderSuccessPage.jsx` | Sau khi đặt xong vì sao phải xoá giỏ? Vào thẳng `/order-success` thì sao? | ⬜ |
| 11 | Hoàn thiện + luyện Q&A | Semantic HTML, Bootstrap grid (responsive), dọn code | toàn bộ | Chỉ vào 1 dòng bất kỳ: dòng này làm gì, vì sao? | ⬜ |

## Quyết định còn mở (sẽ chốt đúng bước đó, bằng câu hỏi)
- Bước 9: đơn custom đi vào giỏ hàng chung, hay là một luồng gửi yêu cầu riêng?
- Bước 10: trang order-success lấy thông tin đơn từ đâu (Context hay `location`)?
- Phong cách giao diện: chốt trước bước 3.

## Quy ước commit
Mỗi bước xong là 1 commit, dạng: `feat: <việc vừa làm>` (vd `feat: add product list page with ProductCard`).
