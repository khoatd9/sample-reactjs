import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/Auth'
import HomePage from './pages/HomePage'

function App() {
  const [claims, setClaims] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for an existing session on load.
    supabase.auth.getClaims().then(({ data }) => {
      setClaims(data?.claims ?? null)
      setLoading(false)
    })

    // Keep the screen in sync when the user logs in / out.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data }) => {
        setClaims(data?.claims ?? null)
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading... ✨
      </div>
    )
  }

  return claims ? <HomePage /> : <Auth />
}

export default App
