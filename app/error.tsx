'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          SYSTEM ERROR
        </h1>
        <p className="text-xl font-bold uppercase">
          SOMETHING WENT BRUTALLY WRONG
        </p>
        <div className="border-4 border-white p-6 text-left">
          <p className="font-mono text-sm text-gray-300">
            Error ID: {error.digest || 'Unknown'}
          </p>
          <p className="font-mono text-sm mt-2">
            {process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-white text-black px-6 py-3 font-black uppercase hover:bg-gray-200 transition-colors border-4 border-white"
          >
            TRY AGAIN
          </button>
          <a
            href="/"
            className="bg-transparent text-white px-6 py-3 font-black uppercase hover:bg-white hover:text-black transition-colors border-4 border-white"
          >
            GO HOME
          </a>
        </div>
      </div>
    </div>
  )
}