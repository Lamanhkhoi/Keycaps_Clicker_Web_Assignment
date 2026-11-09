import { Link, useLocation } from 'react-router-dom'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { SHOP_NAME } from '../config'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function AppNavbar() {
  const { pathname } = useLocation()

  const { totalItems } = useCart()

  // isAdmin = true khi đã đăng nhập bằng tài khoản admin
  // Đăng xuất khi đang ở /admin thì ProtectedRoute tự chuyển sang /login, các trang khác thì ở nguyên.
  const { isAdmin, logout } = useAuth()

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="md" className="site-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {SHOP_NAME}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {/* active = true thì link được tô sáng */}
            <Nav.Link as={Link} to="/" active={pathname === '/'}>
              Trang chủ
            </Nav.Link>
            {/* 'Cửa hàng' sáng cả khi đang ở /products/3, nên dùng startsWith */}
            <Nav.Link as={Link} to="/products" active={pathname.startsWith('/products')}>
              Cửa hàng
            </Nav.Link>
            <Nav.Link as={Link} to="/request" active={pathname === '/request'}>
              Yêu cầu game
            </Nav.Link>
            {/* Link Admin chỉ hiện khi là admin */}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin" active={pathname === '/admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" active={pathname === '/cart'}>
              Giỏ hàng <Badge bg="success">{totalItems}</Badge>
            </Nav.Link>
            {/* Chưa đăng nhập: nút Đăng nhập Admin. Đã đăng nhập: nút Đăng xuất */}
            {isAdmin ? (
              <Button variant="success" size="sm" className="ms-md-2 align-self-center" onClick={logout}>
                Đăng xuất
              </Button>
            ) : (
              <Button as={Link} to="/login" variant="success" size="sm" className="ms-md-2 align-self-center">
                Đăng nhập Admin
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
