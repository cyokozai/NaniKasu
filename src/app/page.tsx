'use client'

import { useAuth } from '@/contexts/auth-context'
import { GoogleSignInButton, GitHubSignInButton } from '@/components/oauth-buttons'
import { UserProfile } from '@/components/user-profile'

export default function Home() {
  const { user, loading, isConfigured } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NaniKasu</h1>
            <p className="text-gray-600">
              Transform Inventory management from a &apos;troublesome task&apos; into a &apos;smart, on-site experience&apos;!
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">
              Setup Required
            </h2>
            <p className="text-yellow-700 mb-4">
              To use authentication, you need to configure Supabase:
            </p>
            <ol className="list-decimal list-inside text-yellow-700 space-y-2">
              <li>Create a Supabase project</li>
              <li>Copy your project URL and anon key</li>
              <li>Set up your environment variables in .env.local</li>
              <li>Configure Google and GitHub OAuth providers in your Supabase dashboard</li>
            </ol>
            <p className="text-yellow-700 mt-4">
              See the README for detailed setup instructions.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NaniKasu</h1>
          <p className="text-gray-600">
            Transform Inventory management from a &apos;troublesome task&apos; into a &apos;smart, on-site experience&apos;!
          </p>
        </div>

        {user ? (
          <UserProfile />
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Sign in to your account
            </h2>
            <div className="space-y-4">
              <GoogleSignInButton />
              <GitHubSignInButton />
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Sign in with your Google or GitHub account to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
