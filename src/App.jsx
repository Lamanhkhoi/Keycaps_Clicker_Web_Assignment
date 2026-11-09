import { Route, Routes } from 'react-router-dom'
import AppNavbar from './Components/AppNavbar'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import ProductsPage from './Pages/ProductsPage'
import ProductDetailPage from './Pages/ProductDetailPage'
import RequestGamePage from './Pages/RequestGamePage'
import CartPage from './Pages/CartPage'
import CheckoutPage from './Pages/CheckoutPage'
import OrderSuccessPage from './Pages/OrderSuccessPage'
import AdminPage from './Pages/AdminPage'
import LoginPage from './Pages/LoginPage'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFoundPage from './Pages/NotFoundPage'

function App() {
  return (
    <>
      <AppNavbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/request" element={<RequestGamePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
