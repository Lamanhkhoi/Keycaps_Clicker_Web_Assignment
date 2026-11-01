import { Link, useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { SHOP_NAME } from "../config";
import ProductsPage from "../Pages/ProductsPage";

export default function AppNavbar() {
    const location = useLocation();

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">{SHOP_NAME}</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                <Nav className="me-auto">
                    {/* TODO 3: 3 link: Trang chủ, Sản phẩm, Custom.
                    Mẫu: <Nav.Link as={Link} to="/products" active={...}>
                    Gợi ý cho active: so sánh location.pathname với đường dẫn của link.
                    Riêng "Sản phẩm" nên sáng cả khi đang ở /products/3. */
                    <Nav.Link as={Link} to="/products" active={<ProductsPage/>}/>
                    // <Nav.Link as={Link} to="/"/>
                    }
                </Nav>
                {/* giỏ hàng + badge sẽ thêm ở bước 8 */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}