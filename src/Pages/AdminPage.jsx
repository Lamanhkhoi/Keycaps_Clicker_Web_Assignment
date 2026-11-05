import { useEffect, useState } from 'react'
import { Badge, Button, Card, Container, Table } from 'react-bootstrap'
import { createGame, deleteGame, getGames, getOrders, updateGame } from '../api/gameApi'
import GameForm from '../Components/GameForm'
import StatusMessage from '../Components/StatusMessage'
import { formatPrice } from '../utils/price'

// Trang Admin: quản lý game (CRUD) và xem đơn hàng.
// CRUD = Create (thêm), Read (xem), Update (sửa), Delete (xóa).
export default function AdminPage() {
  const [games, setGames] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // showForm: có đang hiện form không. editingGame: game đang sửa (null = đang THÊM mới)
  const [showForm, setShowForm] = useState(false)
  const [editingGame, setEditingGame] = useState(null)

  // READ: lấy danh sách game khi trang mở lần đầu
  useEffect(() => {
    getGames()
      .then((data) => setGames(data))
      .catch(() => setError('Không tải được danh sách game.'))
      .finally(() => setLoading(false))
  }, [])

  // READ: lấy danh sách đơn hàng và yêu cầu
  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data))
      .catch(() => setError('Không tải được danh sách đơn hàng.'))
  }, [])

  const handleAddClick = () => {
    setEditingGame(null)
    setShowForm(true)
  }

  const handleEditClick = (game) => {
    setEditingGame(game)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingGame(null)
  }

  // Dùng chung cho THÊM và SỬA. values từ form: ô number vẫn trả về CHUỖI -> đổi bằng Number()
  const handleSave = (values) => {
    const gameData = {
      ...values,
      price: Number(values.price),
      discount: Number(values.discount),
    }

    if (editingGame !== null) {
      // UPDATE: giữ field cũ (tags, recommendations...) rồi ghi đè bằng dữ liệu mới
      const updatedGame = { ...editingGame, ...gameData }
      updateGame(editingGame.id, updatedGame)
        .then((savedGame) => {
          // Thay đúng game vừa sửa trong mảng bằng bản mới từ server
          setGames(games.map((game) => (game.id === savedGame.id ? savedGame : game)))
          handleCancel()
        })
        .catch(() => setError('Không lưu được thay đổi.'))
    } else {
      // CREATE: game mới cần thêm vài field mặc định
      const newGame = { ...gameData, tags: [gameData.genre], recommendations: 0, steamAppId: 0 }
      createGame(newGame)
        .then((savedGame) => {
          setGames([...games, savedGame])
          handleCancel()
        })
        .catch(() => setError('Không thêm được game.'))
    }
  }

  // DELETE: hỏi xác nhận, xóa trên server, rồi bỏ game đó khỏi state
  const handleDelete = (game) => {
    const sure = window.confirm(`Bạn chắc chắn muốn xóa game ${game.name}?`)
    if (!sure) {
      return
    }

    deleteGame(game.id)
      .then(() => setGames(games.filter((item) => item.id !== game.id)))
      .catch(() => setError('Không xóa được game.'))
  }

  // Nội dung cột 'Nội dung' của bảng đơn hàng
  const getOrderDetail = (order) => {
    if (order.type === 'purchase') {
      return order.items.map((item) => `${item.name} x${item.qty}`).join(', ')
    }
    return `${order.gameName} - ${order.note}`
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Quản lý (Admin)</h1>

      <StatusMessage loading={loading} error={error} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Danh sách game ({games.length})</h2>
        <Button variant="success" onClick={handleAddClick}>
          Thêm game
        </Button>
      </div>

      {showForm && (
        <Card className="mb-4">
          <Card.Body>
            <h3 className="h5">{editingGame === null ? 'Thêm game mới' : `Sửa game: ${editingGame.name}`}</h3>
            {/* key đổi -> React tạo lại form mới, nên initialValues đổi theo game đang sửa */}
            <GameForm
              key={editingGame === null ? 'new' : editingGame.id}
              game={editingGame}
              onSubmit={handleSave}
            />
            <Button variant="secondary" className="mt-2" onClick={handleCancel}>
              Hủy
            </Button>
          </Card.Body>
        </Card>
      )}

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Thể loại</th>
            <th>Giá gốc</th>
            <th>Giảm</th>
            <th>Nổi bật</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.name}</td>
              <td>{game.genre}</td>
              <td>{formatPrice(game.price)}</td>
              <td>{game.discount}%</td>
              <td>{game.featured ? 'Có' : 'Không'}</td>
              <td>
                {/* Bọc arrow function để chỉ gọi khi BẤM, không gọi ngay lúc render */}
                <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEditClick(game)}>
                  Sửa
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(game)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="h4 mt-5 mb-3">Đơn hàng và yêu cầu ({orders.length})</h2>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Loại</th>
            <th>Khách hàng</th>
            <th>Nội dung</th>
            <th>Tổng tiền</th>
            <th>Ngày</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {order.type === 'purchase' ? (
                  <Badge bg="success">Đơn mua</Badge>
                ) : (
                  <Badge bg="warning" text="dark">
                    Yêu cầu
                  </Badge>
                )}
              </td>
              <td>{order.customerName}</td>
              <td>{getOrderDetail(order)}</td>
              <td>{order.type === 'purchase' ? formatPrice(order.total) : '-'}</td>
              <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
