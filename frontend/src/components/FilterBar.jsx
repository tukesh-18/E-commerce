export default function FilterBar({ q, setQ, category, setCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, sort, setSort, onApply }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm mb-4 grid grid-cols-2 md:grid-cols-6 gap-3">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="border rounded-lg p-2 w-full"/>
      <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" className="border rounded-lg p-2 w-full"/>
      <input type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="Min ₹" className="border rounded-lg p-2 w-full"/>
      <input type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Max ₹" className="border rounded-lg p-2 w-full"/>
      <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded-lg p-2 w-full">
        <option value="">Sort</option>
        <option value="price_asc">Price ↑</option>
        <option value="price_desc">Price ↓</option>
        <option value="newest">Newest</option>
      </select>
      <button onClick={onApply} className="rounded-lg bg-gray-900 text-white px-3 py-2">Apply</button>
    </div>
  )
}
