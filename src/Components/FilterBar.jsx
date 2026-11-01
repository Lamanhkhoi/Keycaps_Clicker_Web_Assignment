import { Col, Form, Row } from "react-bootstrap";

const GENRES = ["All", "Action", "Adventure", "RPG", "Strategy", "Simulation", "Casual"];

// Controlled inputs: giá trị hiển thị luôn lấy từ state của CHA (value=...),
// khi người dùng gõ thì gọi callback để CHA cập nhật state (lifting state up).
//
// Props:
//   filters        { genre, sortBy }  — state từ useReducer(filterReducer)
//   search         string             — state từ useState
//   onSearchChange(value)  /  onGenreChange(value)  /  onSortChange(value)
export default function FilterBar({ filters, search, onSearchChange, onGenreChange, onSortChange }) {
  return (
    <Form>
      <Row className="g-2 mb-3">
        <Col md={5}>
          <Form.Control
            placeholder="Tìm game..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={filters.genre} onChange={(e) => onGenreChange(e.target.value)}>
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={filters.sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="popular">Phổ biến nhất</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name">Tên A–Z</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
}
