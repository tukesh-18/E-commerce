import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : { items: [] };
  });
  const { token } = useAuth();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const loadServerCart = async () => {
    const { data } = await api.get('/cart');
    setCart({ items: data.items.map(ci => ({ item: ci.item, quantity: ci.quantity })) });
  };

  const importServerCart = async () => {
    if (!token) return;
    await loadServerCart();
  };

  const exportLocalCart = async (pullServer = false) => {
    if (token && pullServer) {
      const { data } = await api.get('/cart');
      const items = data.items.map(ci => ({ itemId: ci.item._id, quantity: ci.quantity }));
      localStorage.setItem('cart', JSON.stringify({ items: data.items.map(ci => ({ item: ci.item, quantity: ci.quantity })) }));
      return items;
    }
    const raw = localStorage.getItem('cart');
    const local = raw ? JSON.parse(raw) : { items: [] };
    return local.items.map(ci => ({ itemId: ci.item._id || ci.item, quantity: ci.quantity }));
  };

  const clearLocalCart = () => {
    setCart({ items: [] });
    localStorage.setItem('cart', JSON.stringify({ items: [] }));
  };

  const addToCart = async (product, quantity = 1) => {
    if (token) {
      await api.post('/cart/add', { itemId: product._id, quantity });
      await loadServerCart();
    } else {
      setCart(prev => {
        const idx = prev.items.findIndex(ci => (ci.item._id || ci.item) === product._id);
        if (idx >= 0) {
          const items = [...prev.items];
          items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
          return { items };
        } else {
          return { items: [...prev.items, { item: product, quantity }] };
        }
      });
    }
  };

  const updateQty = async (productId, quantity) => {
    if (token) {
      await api.patch('/cart/update', { itemId: productId, quantity });
      await loadServerCart();
    } else {
      setCart(prev => {
        const items = prev.items.map(ci => {
          const pid = ci.item._id || ci.item;
          return pid === productId ? { ...ci, quantity } : ci;
        }).filter(ci => ci.quantity > 0);
        return { items };
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (token) {
      await api.delete(`/cart/remove/${productId}`);
      await loadServerCart();
    } else {
      setCart(prev => ({ items: prev.items.filter(ci => (ci.item._id || ci.item) !== productId) }));
    }
  };

  const count = cart.items.reduce((sum, ci) => sum + ci.quantity, 0);
  const total = cart.items.reduce((sum, ci) => sum + (ci.item.price || 0) * ci.quantity, 0);

  return (
    <CartCtx.Provider value={{ cart, addToCart, updateQty, removeFromCart, count, total, importServerCart, exportLocalCart, clearLocalCart }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
