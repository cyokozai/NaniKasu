import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <h1 className="text-xl font-semibold text-red-800 mb-4">
          Authentication Error
        </h1>
        <p className="text-red-700 mb-4">
          Sorry, we could not authenticate you. This might be due to:
        </p>
        <ul className="list-disc list-inside text-red-700 mb-4 space-y-1">
          <li>An expired authentication code</li>
          <li>A cancelled authentication request</li>
          <li>A misconfigured OAuth provider</li>
        </ul>
        <Link
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </Link>
      </div>
    </div>
  )
}