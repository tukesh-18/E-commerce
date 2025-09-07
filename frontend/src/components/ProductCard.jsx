import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      <img src={product.imageUrl} alt={product.title} className="w-full h-40 object-cover"/>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold">₹{product.price}</span>
          <button onClick={() => addToCart(product, 1)} className="px-3 py-1 rounded bg-gray-900 text-white">Add</button>
        </div>
      </div>
    </div>
  )
}
