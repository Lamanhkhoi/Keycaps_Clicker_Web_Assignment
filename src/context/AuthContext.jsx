import { createContext, useContext, useEffect, useState } from 'react'
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../config'

// Navbar (ẩn/hiện link Admin), ProtectedRoute (chặn /admin), LoginPage đều dùng chung trạng thái đăng nhập này.
const AuthContext = createContext(null)

// Đọc người dùng đã đăng nhập từ localStorage (nếu có), để F5 trang không bị đăng xuất.
const loadUser = () => {
  const saved = localStorage.getItem('user')
  if (saved === null) {
    return null
  }
  return JSON.parse(saved)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser)

  // Mỗi khi user đổi thì lưu lại. Đăng xuất (user = null) thì xóa khỏi localStorage.
  useEffect(() => {
    if (user === null) {
      localStorage.removeItem('user')
    } else {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  // Trả về true nếu đúng tài khoản admin, false nếu sai.
  const login = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setUser({ username: username, role: 'admin' })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  // isAdmin SUY RA từ user -> không tạo state riêng.
  const isAdmin = user !== null && user.role === 'admin'

  const value = { user, isAdmin, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Lối tắt: trong component chỉ cần viết const { isAdmin, login } = useAuth()
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
