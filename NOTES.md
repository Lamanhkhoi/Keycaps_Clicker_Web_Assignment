# NOTES – Tính năng → Kiến thức → File (chuẩn bị Q&A FER202)

> File này cập nhật sau MỖI bước. Cột "File" là dự kiến, sẽ sửa lại cho đúng khi code xong.
> Cột "Q&A" là câu thầy có thể hỏi. Tự trả lời thành tiếng trước khi demo.

## Quyết định đã chốt
- Stack: Vite + React (JavaScript), react-router-dom, bootstrap + react-bootstrap, formik + yup.
- Không backend: dữ liệu sản phẩm là file JS tĩnh (`src/data/products.js`).
- Ảnh: tải về để trong `public/images/` (không dùng link ngoài, để demo offline vẫn chạy).
- Tên shop tạm: đặt ở MỘT chỗ (`src/config.js`), đổi tên chỉ sửa 1 dòng.
- Giao diện: màu/font gom vào MỘT file (`src/styles/theme.css`), chốt phong cách sau cũng không phải sửa component.
- Form: dùng `useFormik` + `Yup.object({...})` đúng như Exercise 12 (không dùng `<Formik>`/`<Field>`).
- Router: viết kiểu slide `<BrowserRouter>` + `<Routes>` + `<Route>` + `<Link>`.

## KHÔNG dùng (vì chưa học / ngoài phạm vi) – để trả lời "sao em không dùng X?"
- Redux → đã có Context + useReducer là đủ cho giỏ hàng.
- fetch / API / backend → dữ liệu tĩnh, ngoài phạm vi môn.
- PropTypes, lazy/code-splitting → chưa học trên lớp.
- Tailwind, Next.js, TypeScript, UI kit khác → ngoài phạm vi.

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
