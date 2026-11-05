import { SHOP_NAME } from '../config'

export default function Footer() {
  return (
    <footer className="site-footer text-center py-3 mt-5">
      <small>
        © 2026 {SHOP_NAME} - Bài tập FER202, tạo bởi Khôi. Dữ liệu game lấy từ Steam, chỉ dùng cho học tập.
      </small>
    </footer>
  )
}
