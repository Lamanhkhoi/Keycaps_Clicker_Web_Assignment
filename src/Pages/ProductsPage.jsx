import { useEffect, useReducer, useState } from 'react'
import { Container } from 'react-bootstrap'
import { getGames } from '../api/gameApi'
import FilterBar from '../Components/FilterBar'
import GameGrid from '../Components/GameGrid'
import GameSkeleton from '../Components/GameSkeleton'
import StatusMessage from '../Components/StatusMessage'
import { filterReducer, initialFilters } from '../reducers/filterReducer'
import { getFinalPrice } from '../utils/price'

// Trang Cửa hàng: danh sách game, tìm kiếm, lọc thể loại, sắp xếp.
export default function ProductsPage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Ô tìm kiếm
  const [search, setSearch] = useState('')

  // Bộ lọc có 2 giá trị (genre, sortBy) -> useReducer
  const [filters, dispatch] = useReducer(filterReducer, initialFilters)

  useEffect(() => {
    getGames()
      .then((data) => setGames(data))
      .catch(() => setError('Không tải được danh sách game. Vui lòng thử lại sau.'))
      .finally(() => setLoading(false))
  }, [])

  // Danh sách hiển thị được TÍNH từ games + search + filters mỗi lần render

  const visibleGames = games.filter((game) => {
    const matchGenre = filters.genre === 'All' || game.genre === filters.genre
    const matchSearch = game.name.toLowerCase().includes(search.toLowerCase())
    return matchGenre && matchSearch
  })

  //sắp xếp: kết quả < 0 thì a đứng trước, > 0 thì b đứng trước
  visibleGames.sort((a, b) => {
    if (filters.sortBy === 'price-asc') {
      return getFinalPrice(a) - getFinalPrice(b)
    }
    if (filters.sortBy === 'price-desc') {
      return getFinalPrice(b) - getFinalPrice(a)
    }
    if (filters.sortBy === 'name') {
      return a.name.localeCompare(b.name)
    }
    // 'popular': nhiều lượt đánh giá hơn thì đứng trước
    return b.recommendations - a.recommendations
  })

  return (
    <Container className="py-4">
      <h1 className="mb-4">Cửa hàng</h1>

      <FilterBar
        filters={filters}
        search={search}
        onSearchChange={(value) => setSearch(value)}
        onGenreChange={(value) => dispatch({ type: 'SET_GENRE', payload: value })}
        onSortChange={(value) => dispatch({ type: 'SET_SORT', payload: value })}
      />

      
      {loading && <GameSkeleton />}
      <StatusMessage error={error} />
      {!loading && error === '' && <GameGrid games={visibleGames} />}
    </Container>
  )
}
