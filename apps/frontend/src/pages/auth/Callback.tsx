import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Callback() {
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const { error } = await supabase.auth.exchangeCodeForSession()
      navigate(error ? '/login?error=oauth' : '/home')
    })()
  }, [])
  return <p>認証中…</p>
} 