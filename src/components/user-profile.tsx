'use client'

import Image from 'next/image'
import { useAuth } from '@/contexts/auth-context'

export function UserProfile() {
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md">
      <div className="flex items-center space-x-4">
        {user.user_metadata?.avatar_url && (
          <Image
            src={user.user_metadata.avatar_url}
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {user.user_metadata?.full_name || user.email}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          {user.user_metadata?.provider && (
            <p className="text-sm text-gray-500 capitalize">
              Signed in with {user.app_metadata?.provider}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="text-sm text-gray-600">
          <strong>User ID:</strong> {user.id}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}
        </div>
      </div>

      <button
        onClick={signOut}
        className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}