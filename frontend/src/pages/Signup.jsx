import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup({ name, email, password })
      nav('/')
    } catch (e) {
      setError(e.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign up</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="border rounded-lg p-2 w-full" required/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="border rounded-lg p-2 w-full" required/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="border rounded-lg p-2 w-full" required/>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="w-full rounded-lg bg-gray-900 text-white py-2">Create account</button>
      </form>
      <p className="text-sm text-gray-600 mt-3">Already have an account? <Link className="underline" to="/login">Login</Link></p>
    </div>
  )
}
