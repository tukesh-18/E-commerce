import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, updateQty, removeFromCart, total } = useCart()

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p className="text-gray-600">Cart is empty.</p>
      ) : (
        <div className="space-y-3">
          {cart.items.map(ci => {
            const id = ci.item._id || ci.item
            return (
              <div key={id} className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">
                <img src={ci.item.imageUrl} alt={ci.item.title} className="w-16 h-16 object-cover rounded"/>
                <div className="flex-1">
                  <div className="font-medium">{ci.item.title}</div>
                  <div className="text-sm text-gray-600">₹{ci.item.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>updateQty(id, ci.quantity-1)} className="px-2 py-1 border rounded">-</button>
                  <span className="w-8 text-center">{ci.quantity}</span>
                  <button onClick={()=>updateQty(id, ci.quantity+1)} className="px-2 py-1 border rounded">+</button>
                </div>
                <button onClick={()=>removeFromCart(id)} className="px-3 py-1 rounded bg-red-600 text-white">Remove</button>
              </div>
            )
          })}
          <div className="text-right text-xl font-semibold">Total: ₹{total}</div>
        </div>
      )}
    </div>
  )
}
