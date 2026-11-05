import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/theme.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'

// Gắn React vào <div id="root"> trong index.html.
// BrowserRouter bọc ngoài cùng để mọi component dùng được Link, useNavigate...
// CartProvider bọc App để mọi trang dùng chung một giỏ hàng.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
