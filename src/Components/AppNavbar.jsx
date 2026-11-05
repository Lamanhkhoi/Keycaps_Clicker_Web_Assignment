import { Link, useLocation } from 'react-router-dom'
import { Badge, Container, Nav, Navbar } from 'react-bootstrap'
import { SHOP_NAME } from '../config'
import { useCart } from '../context/CartContext'

export default function AppNavbar() {
  // useLocation cho biết đường dẫn hiện tại, ví dụ '/products/3'
  const { pathname } = useLocation()

  // Lấy tổng số game trong giỏ từ CartContext để hiện ở nút Giỏ hàng
  const { totalItems } = useCart()

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
            <Nav.Link as={Link} to="/admin" active={pathname === '/admin'}>
              Admin
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" active={pathname === '/cart'}>
              Giỏ hàng <Badge bg="success">{totalItems}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
