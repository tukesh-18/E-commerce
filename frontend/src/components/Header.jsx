import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
    nav('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">🛍️ Ecom</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Products</Link>
          <Link to="/cart" className="hover:underline">Cart ({count})</Link>
          {user ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">Login</Link>
              <Link to="/signup" className="px-3 py-1 rounded bg-gray-900 text-white hover:bg-black">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
