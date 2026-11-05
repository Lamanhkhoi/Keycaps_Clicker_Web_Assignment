import { Col, Form, InputGroup, Row } from 'react-bootstrap'

const GENRES = ['All', 'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Casual']

// Controlled input: giá trị hiển thị luôn lấy từ state của component CHA (value=...).
// Khi người dùng gõ hoặc chọn, gọi hàm callback để component CHA cập nhật state.
//
// Props:
//   filters = { genre, sortBy }  (state của useReducer)
//   search  = chuỗi tìm kiếm     (state của useState)
//   onSearchChange, onGenreChange, onSortChange = các hàm callback, nhận value mới
export default function FilterBar({ filters, search, onSearchChange, onGenreChange, onSortChange }) {
  return (
    <Form>
      <Row className="g-2 mb-4">
        <Col md={5}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Tìm game..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select value={filters.genre} onChange={(e) => onGenreChange(e.target.value)}>
            {GENRES.map((genre) => (
              // value vẫn là 'All', chỉ đổi chữ hiển thị cho người dùng
              <option key={genre} value={genre}>
                {genre === 'All' ? 'Tất cả thể loại' : genre}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={filters.sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="popular">Phổ biến nhất</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name">Tên A-Z</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  )
}
