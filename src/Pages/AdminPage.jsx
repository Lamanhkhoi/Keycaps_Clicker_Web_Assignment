import { useEffect, useState } from 'react'
import { Badge, Button, Card, Container, Table } from 'react-bootstrap'
import { createGame, deleteGame, getGames, getOrders, updateGame } from '../api/gameApi'
import GameForm from '../Components/GameForm'
import StatusMessage from '../Components/StatusMessage'
import { formatPrice } from '../utils/price'


export default function AdminPage() {
  const [games, setGames] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  
  const [showForm, setShowForm] = useState(false)
  const [editingGame, setEditingGame] = useState(null)

  
  useEffect(() => {
    getGames()
      .then((data) => setGames(data))
      .catch(() => setError('Không tải được danh sách game.'))
      .finally(() => setLoading(false))
  }, [])

  
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

  
  const handleSave = (values) => {
    const gameData = {
      ...values,
      price: Number(values.price),
      discount: Number(values.discount),
      recommendations: Number(values.recommendations),
    }

    
    const request =
      editingGame !== null
        ? updateGame(editingGame.id, { ...editingGame, ...gameData })
        : createGame({ ...gameData, tags: [gameData.genre], steamAppId: 0 })

    
    return request
      .then((savedGame) => {
        if (editingGame !== null) {
          setGames(games.map((game) => (game.id === savedGame.id ? savedGame : game)))
        } else {
          setGames([...games, savedGame])
        }
        handleCancel()
      })
      .catch(() => setError(editingGame !== null ? 'Không lưu được thay đổi.' : 'Không thêm được game.'))
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
            
            {editingGame !== null ? (
              <GameForm initialValues={editingGame} onSubmit={handleSave} submitLabel="Cập nhật" />
            ) : (
              <GameForm onSubmit={handleSave} submitLabel="Thêm" />
            )}
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
