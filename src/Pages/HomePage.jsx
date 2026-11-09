import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getGames } from '../api/gameApi'
import GameGrid from '../Components/GameGrid'
import GameSkeleton from '../Components/GameSkeleton'
import StatusMessage from '../Components/StatusMessage'
import { SHOP_NAME } from '../config'


export default function HomePage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

 
  useEffect(() => {
    getGames()
      .then((data) => setGames(data))
      .catch(() => setError('Không tải được danh sách game. Vui lòng thử lại sau.'))
      .finally(() => setLoading(false))
  }, [])

  
  const featuredGames = games.filter((game) => game.featured === true)
  const saleGames = games.filter((game) => game.discount > 0)

  return (
    <div>
      <div className="hero-banner py-5 mb-4">
        <Container>
          <h1>Chào mừng đến {SHOP_NAME}</h1>
          <p className="lead">Hàng chục tựa game hay, giá tốt, mua nhanh trong vài cú nhấp chuột.</p>
          <Button as={Link} to="/products" variant="success" size="lg">
            Khám phá cửa hàng
          </Button>
        </Container>
      </div>

      <Container className="pb-4">
        {loading && <GameSkeleton />}
        <StatusMessage error={error} />

        {featuredGames.length > 0 && (
          <section className="mb-5">
            <h2 className="mb-3">Game nổi bật</h2>
            <GameGrid games={featuredGames} />
          </section>
        )}

        {saleGames.length > 0 && (
          <section>
            <h2 className="mb-3">Đang giảm giá</h2>
            <GameGrid games={saleGames} />
          </section>
        )}
      </Container>
    </div>
  )
}
