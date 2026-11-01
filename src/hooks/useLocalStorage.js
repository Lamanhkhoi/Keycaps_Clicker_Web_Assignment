import { useState } from "react";

// Custom hook: giống useState nhưng giá trị được lưu vào localStorage.
// Cách dùng: const [value, setValue] = useLocalStorage("cart", []);
//
// Hình dung: useState là "cuốn sổ ghi nháp" mất khi F5; localStorage là "ngăn kéo" còn lại.
export default function useLocalStorage(key, initialValue) {
  // TODO 1: khởi tạo state bằng "lazy initializer" (truyền HÀM vào useState):
  //         đọc localStorage.getItem(key) → có thì JSON.parse, không thì initialValue
  // TODO 2: useEffect([key, value]) → localStorage.setItem(key, JSON.stringify(value))
  // Câu hỏi vấn đáp: vì sao truyền hàm vào useState thay vì gọi thẳng?
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
}
