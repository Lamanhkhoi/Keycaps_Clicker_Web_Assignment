import { Card, Col, Placeholder, Row } from 'react-bootstrap'

// Khung xương hiện trong lúc chờ API trả dữ liệu (đẹp hơn vòng quay loading).
// 8 thẻ rỗng nhấp nháy, cùng kích thước với GameCard.
const FAKE_ITEMS = [0, 1, 2, 3, 4, 5, 6, 7]

export default function GameSkeleton() {
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {FAKE_ITEMS.map((number) => (
        <Col key={number}>
          <Card className="skeleton-card h-100">
            <div className="skeleton-img" />
            <Card.Body>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={4} />
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
