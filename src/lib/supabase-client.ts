import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Check if we're in a browser environment and have the required env vars
  if (typeof window === 'undefined') {
    return null
  }
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key || url === 'https://placeholder.supabase.co' || key === 'placeholder_key') {
    return null
  }
  
  return createBrowserClient(url, key)
}