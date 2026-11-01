// Tất cả lời gọi MockAPI nằm ở đây. Component KHÔNG tự viết fetch,
// chỉ import hàm bên dưới → đổi API sau này chỉ sửa 1 file.
import { API_URL } from "../config";

// Hàm dùng chung cho mọi lời gọi.
// fetch KHÔNG tự ném lỗi khi server trả 404/500 → phải tự kiểm tra res.ok.
async function request(path, options) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

// Tạo options cho POST / PUT: gửi JSON
function jsonOptions(method, data) {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}

// ----- games -----
export const getGames = () => request("/games");
export const getGameById = (id) => request(`/games/${id}`);
export const createGame = (game) => request("/games", jsonOptions("POST", game));
export const updateGame = (id, game) => request(`/games/${id}`, jsonOptions("PUT", game));
export const deleteGame = (id) => request(`/games/${id}`, { method: "DELETE" });

// ----- orders (gồm 2 loại: type "purchase" và type "request") -----
export const getOrders = () => request("/orders");
export const createOrder = (order) => request("/orders", jsonOptions("POST", order));
