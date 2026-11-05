# Ôn vấn đáp FER202 - PixelStore (web bán game kiểu Steam)

Đọc theo thứ tự. Mỗi mục: **chức năng -> file -> kiến thức -> câu hỏi thầy hay hỏi -> trả lời ngắn**.
Mẹo: khi thầy chỉ vào một dòng, hãy nói theo mẫu "dòng này (làm gì) để (vì sao)".

## 1. Khởi động app
**File:** `src/main.jsx`
- `createRoot(...).render(...)` gắn React vào `<div id="root">` trong `index.html`.
- Bọc ngoài: `<BrowserRouter>` (cho phép chia trang) rồi `<CartProvider>` (chia sẻ giỏ hàng).
- Hỏi: *Virtual DOM là gì?* -> React giữ một bản sao DOM trong bộ nhớ. Khi state đổi, React so sánh bản mới và cũ, chỉ cập nhật phần khác nhau lên DOM thật nên nhanh hơn.

## 2. Chia trang (Router)
**File:** `src/App.jsx`, `src/Components/AppNavbar.jsx`
- `<Routes>` chứa nhiều `<Route path=... element=...>`. `path="*"` bắt mọi địa chỉ không khớp (trang 404).
- `<Link>` đổi trang mà không tải lại cả web (SPA). Thẻ `<a>` thì tải lại.
- `useLocation()` cho biết đường dẫn hiện tại, dùng để tô sáng link đang ở (`active`).
- Hỏi: *SPA khác web nhiều trang chỗ nào?* -> SPA chỉ tải 1 lần, đổi trang bằng cách React vẽ lại component.

## 3. Lấy dữ liệu từ MockAPI
**File:** `src/api/gameApi.js`, `src/config.js`
- `axios.get(url)` trả về Promise. `.then` chạy khi có kết quả, `.catch` chạy khi lỗi, `.finally` luôn chạy (dùng để tắt loading).
- axios trả về `response` (cái thùng), dữ liệu thật ở `response.data` -> bóc `.data` một lần trong `gameApi.js`.
- axios TỰ báo lỗi (reject) khi server trả 404/500, không cần kiểm tra `res.ok` như `fetch`. POST/PUT chỉ cần truyền object, axios tự `JSON.stringify` và tự đặt header.
- 4 thao tác CRUD ứng với: GET (xem), POST (thêm), PUT (sửa), DELETE (xóa).
- Hỏi: *Vì sao gom gọi API vào một file?* -> Đổi địa chỉ API hoặc đổi axios/fetch chỉ sửa một chỗ, các trang chỉ gọi hàm.

## 4. Hiển thị danh sách
**File:** `src/Pages/ProductsPage.jsx`, `GameGrid.jsx`, `GameCard.jsx`
- `useState` giữ dữ liệu thay đổi (games, loading, error).
- `useEffect(() => {...}, [])` chạy 1 lần sau khi trang hiện lên lần đầu, dùng để gọi API.
- `games.map(...)` biến mảng dữ liệu thành mảng thẻ JSX. `key` giúp React nhận ra từng phần tử khi danh sách đổi.
- Props: dữ liệu cha truyền cho con (`<GameCard game={game} />`). Props chỉ đọc, không được sửa trong component con.
- Hỏi: *State khác props?* -> State là dữ liệu riêng của component, đổi được và làm vẽ lại. Props là dữ liệu nhận từ cha, chỉ đọc.
- Hỏi: *Vì sao gọi API trong useEffect?* -> Gọi thẳng trong thân component thì mỗi lần vẽ lại sẽ gọi lại, dễ lặp vô hạn. useEffect với `[]` đảm bảo chỉ gọi 1 lần.

## 5. Tìm kiếm, lọc, sắp xếp
**File:** `ProductsPage.jsx`, `reducers/filterReducer.js`, `Components/FilterBar.jsx`
- Ô tìm kiếm: 1 giá trị nên dùng `useState`. Bộ lọc: nhiều giá trị (genre, sortBy) nên dùng `useReducer`.
- Danh sách hiển thị (`visibleGames`) KHÔNG phải state mà được TÍNH từ games + search + filters mỗi lần vẽ. Lưu thêm state sẽ dễ bị lệch dữ liệu.
- Controlled input: ô nhập có `value` lấy từ state và `onChange` cập nhật state, nên React luôn kiểm soát giá trị ô nhập.
- `filter` giữ phần tử thỏa điều kiện, trả mảng MỚI. `sort` cần hàm so sánh `(a, b)`.

## 6. Chi tiết game
**File:** `src/Pages/ProductDetailPage.jsx`
- Route `/products/:id`. `useParams()` lấy `id` từ URL, và nó luôn là **chuỗi**.
- `useEffect(..., [id])`: chạy lại mỗi khi `id` đổi.
- Id không tồn tại: MockAPI trả 404, `.catch` hiện thông báo lỗi (conditional rendering).
- `navigate(-1)`: quay lại trang trước. `navigate("/products")`: đi đến một địa chỉ cụ thể.

## 7. Giỏ hàng (phần quan trọng nhất)
**File:** `reducers/cartReducer.js`, `context/CartContext.jsx`, `CartPage.jsx`, `CartItemRow.jsx`
- **Reducer** là hàm `(state cũ, action) -> state mới`. Có 4 action: ADD, REMOVE, UPDATE_QTY, CLEAR.
- Hỏi: *Vì sao không được sửa state trực tiếp (push, item.qty++)?* -> React so sánh state cũ và mới bằng tham chiếu. Sửa trực tiếp thì tham chiếu không đổi, React không biết để vẽ lại. Phải tạo mảng mới (`map`, `filter`, `[...state, item]`).
- Ví dụ chạy: `[]` -> ADD Undertale -> `[{Undertale, qty 1}]` -> ADD lần nữa -> `qty 2` -> REMOVE -> `[]`.
- **Context** giải quyết prop drilling (truyền props qua nhiều tầng). Navbar, trang giỏ, thẻ game đều dùng `useCart()` lấy chung giỏ.
- `totalItems`, `totalPrice` là dữ liệu suy ra từ cart nên tính trực tiếp khi render, không tạo state.
- **localStorage**: `useEffect(..., [cart])` lưu giỏ mỗi khi cart đổi. `useReducer(cartReducer, [], loadCart)` dùng hàm `loadCart` để đọc lại giỏ lúc mở trang, nên F5 không mất giỏ.
- Hỏi: *`[cart]` trong useEffect nghĩa là gì?* -> Effect chỉ chạy khi `cart` thay đổi.

## 8. Thanh toán + form
**File:** `CheckoutPage.jsx`, `RequestGamePage.jsx`, `OrderSuccessPage.jsx`, `Components/GameForm.jsx`
- Khuôn giống Lab4/5/6, chia 4 phần: PHẦN 1 `initialValues` và PHẦN 2 `validationSchema` khai báo NGOÀI component; PHẦN 3 `useFormik({ initialValues, validationSchema, onSubmit })`; PHẦN 4 giao diện.
- Yup: `.required()` viết trước, sau đó mới `.min()`, `.email()`, `.url()`... mỗi luật một dòng.
- Mỗi ô tự gắn `value`, `onChange={formik.handleChange}`, `onBlur={formik.handleBlur}`; class `form-control is-invalid` khi có lỗi; lỗi hiện bằng `<div className="text-danger small">`.
- `<form noValidate>`: tắt kiểm tra của trình duyệt để chỉ Yup báo lỗi (tiếng Việt).
- `touched`: ô đã được người dùng chạm vào. Chỉ hiện lỗi khi `touched` để không báo lỗi ngay lúc vừa mở form.
- `onSubmit` chỉ chạy khi mọi ô hợp lệ. Gửi `POST /orders`, thành công thì `dispatch({type:"CLEAR"})` và `navigate("/order-success", { state: { order } })`.
- Hỏi: *Vì sao phải xóa giỏ sau khi đặt?* -> Đơn đã được ghi nhận. Không xóa thì người dùng có thể mua trùng.
- Hỏi: *Vào thẳng /order-success thì sao?* -> Không có `location.state`, nên dùng `<Navigate to="/" replace />` đưa về trang chủ.

## 9. Admin CRUD
**File:** `AdminPage.jsx`, `GameForm.jsx`
- **Read:** `getGames()` trong `useEffect`. **Create:** `createGame()` rồi thêm game mới vào state. **Update:** `updateGame(id, data)` rồi thay đúng game trong state bằng `map`. **Delete:** `deleteGame(id)` rồi bỏ game khỏi state bằng `filter`.
- `window.confirm` hỏi xác nhận trước khi xóa.
- Giống Lab6 OrchidForm: sửa thì `<GameForm initialValues={editingGame} ... />`, thêm thì không truyền (dùng `emptyGame`). `enableReinitialize: true` để khi bấm Sửa game khác, form nạp lại giá trị mới.
- `handleSave` return Promise để Formik biết lúc nào lưu xong (nút 'Đang lưu...' tự mở lại).
- Giá trị ô `type="number"` vẫn là chuỗi, nên trước khi gửi phải đổi bằng `Number(...)`.

## 10. Trang chủ và Yêu cầu game
- **HomePage:** `games.filter(g => g.featured)` lấy game nổi bật, `filter(g => g.discount > 0)` lấy game giảm giá.
- **RequestGamePage:** cùng mẫu với Checkout, gửi `POST /orders` với `type: "request"`.
- Gộp 2 loại vào 1 resource `orders` vì gói free của MockAPI chỉ cho 2 resource.

## Giá sau giảm (`utils/price.js`)
Undertale: price 9.99, discount 75 -> giảm 9.99 x 75 / 100 = 7.4925 -> còn 2.4975 -> làm tròn 2 số lẻ = **$2.50**.
Counter-Strike 2: price 0 -> hiển thị "Free".

## Những điều nên thú nhận nếu thầy hỏi thẳng
- Dữ liệu game mẫu lấy từ Steam và được nạp bằng một script Node chạy một lần (`mockapi/seed.mjs`), không nằm trong app.
- Giao diện dùng Bootstrap dark mode cộng một file CSS riêng (`styles/theme.css`).

## Giao diện (phần thêm sau)
- **Thẻ game:** giá một dòng, nút "Thêm vào giỏ" một dòng (`GameCard.jsx`).
- **Khung xương khi tải** (`GameSkeleton.jsx`): trong lúc `loading === true` hiện các thẻ giả nhấp nháy, tải xong thì thay bằng `GameGrid`. Đây là conditional rendering: `{loading && <GameSkeleton />}`.
- **Màu và kiểu dáng** nằm hết trong `src/styles/theme.css`. Các biến màu ở `:root` ở đầu file, muốn đổi phong cách chỉ cần sửa ở đó.
- **Chế độ tối** của Bootstrap 5.3 bật bằng `data-bs-theme="dark"` ở thẻ `<html>` trong `index.html`.
- **Responsive:** `Row xs={1} md={2} lg={3} xl={4}` trong `GameGrid.jsx` (1/2/3/4 cột theo độ rộng màn hình).
