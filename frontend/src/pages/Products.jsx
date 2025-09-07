import { useEffect, useState } from 'react'
import api from '../api/axios'
import FilterBar from '../components/FilterBar'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('')
  const [limit, setLimit] = useState(50)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)

  const fetchItems = async () => {
    const params = {}
    if (q) params.q = q
    if (category) params.category = category
    if (minPrice) params.minPrice = minPrice
    if (maxPrice) params.maxPrice = maxPrice
    if (sort) params.sort = sort
     params.page = page         // 👈 added
     params.limit = limit
    const { data } = await api.get('/items', { params })
    setItems(data.items)
    setTotalPages(data.pages)
  }

  useEffect(() => { fetchItems() }, []) // initial

  return (
    <div>
      <FilterBar
        q={q} setQ={setQ}
        category={category} setCategory={setCategory}
        minPrice={minPrice} setMinPrice={setMinPrice}
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        sort={sort} setSort={setSort}
        onApply={fetchItems}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  )
}
