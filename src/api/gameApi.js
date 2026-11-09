import axios from 'axios'
import { API_URL } from '../config'

const GAMES_URL = `${API_URL}/games`
const ORDERS_URL = `${API_URL}/orders`


// ----- games -----
export function getGames() {
  return axios.get(GAMES_URL).then((response) => response.data)
}

export function getGameById(id) {
  return axios.get(`${GAMES_URL}/${id}`).then((response) => response.data)
}

export function createGame(game) {
  return axios.post(GAMES_URL, game).then((response) => response.data)
}

export function updateGame(id, game) {
  return axios.put(`${GAMES_URL}/${id}`, game).then((response) => response.data)
}

export function deleteGame(id) {
  return axios.delete(`${GAMES_URL}/${id}`).then((response) => response.data)
}

// ----- orders (2 loại: type 'purchase' là đơn mua, type 'request' là yêu cầu thêm game) -----
export function getOrders() {
  return axios.get(ORDERS_URL).then((response) => response.data)
}

export function createOrder(order) {
  return axios.post(ORDERS_URL, order).then((response) => response.data)
}
