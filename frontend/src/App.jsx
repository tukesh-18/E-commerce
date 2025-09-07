import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Products from './pages/Products.jsx'
import Cart from './pages/Cart.jsx'
import { useAuth } from './context/AuthContext.jsx'

export default function App() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
