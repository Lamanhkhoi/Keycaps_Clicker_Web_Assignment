import AppNavbar from './Components/AppNavbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import ProductsPage from './Pages/ProductsPage'
import ProductsDetailPage from './Pages/ProductDetailPage'
import RequestGamePage from './Pages/RequestGamePage'
import CartPage from './Pages/CartPage'
import CheckoutPage from './Pages/CheckoutPage'
import OrderSuccessPage from './Pages/OrderSuccessPage'
import AdminPage from './Pages/AdminPage'
import NotFoundPage from './Pages/NotFoundPage'

function App() {
  
  return (
    <>
      <AppNavbar />
        <main>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/products' element={<ProductsPage/>}/>
            <Route path='/products/:id' element={<ProductsDetailPage/>}/>
            <Route path='/request' element={<RequestGamePage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/checkout' element={<CheckoutPage/>}/>
            <Route path='/order-success' element={<OrderSuccessPage/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </main>
      <Footer/>
    </>
  )
}

export default App
