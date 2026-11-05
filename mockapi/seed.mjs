// Đẩy dữ liệu mẫu lên MockAPI.
// Cách dùng (chạy ở thư mục gốc project):
//   node mockapi/seed.mjs https://<project-secret>.mockapi.io
//
// Điều kiện: đã tạo sẵn 2 resource "games" và "orders" trên MockAPI, và cả hai đang RỖNG
// (MockAPI hay tự sinh vài record giả khi tạo resource → xoá hết trước).
// Không cần cài thêm package: dùng fetch có sẵn của Node 18+.

import { readFile } from "node:fs/promises";

const base = process.argv[2]?.replace(/\/$/, "");
if (!base) {
  console.error("Thiếu Base URL.\nVí dụ: node mockapi/seed.mjs https://abc123.mockapi.io");
  process.exit(1);
}

const readJson = async (file) =>
  JSON.parse(await readFile(new URL(file, import.meta.url), "utf-8"));

async function call(path, options) {
  const res = await fetch(`${base}${path}`, options);
  if (!res.ok) throw new Error(`${options?.method ?? "GET"} ${path} → ${res.status}`);
  return res.json();
}

const post = (path, data) =>
  call(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// Chặn seed hai lần (sẽ bị trùng game)
for (const resource of ["games", "orders"]) {
  const existing = await call(`/${resource}`);
  if (existing.length > 0) {
    console.error(`Resource "${resource}" đang có ${existing.length} record. Hãy xoá hết rồi chạy lại.`);
    process.exit(1);
  }
}

// 1) games — POST lần lượt để id tăng dần
const games = await readJson("./games.json");
const idByName = {};
for (const game of games) {
  const created = await post("/games", game);
  idByName[game.name] = created.id;
  console.log(`games  #${created.id}  ${game.name}`);
}

// 2) orders — gameId trong đơn mẫu được đổi sang id THẬT vừa tạo ở bước 1
const orders = await readJson("./orders.json");
for (const order of orders) {
  const data =
    order.type === "purchase"
      ? { ...order, items: order.items.map((i) => ({ ...i, gameId: idByName[i.name] })) }
      : order;
  const created = await post("/orders", data);
  console.log(`orders #${created.id}  ${order.type}  ${order.customerName}`);
}

console.log(`\nXong: ${games.length} games, ${orders.length} orders.`);
