export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-4xl text-center space-y-12">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">404</h1>
        <h2 className="text-4xl md:text-6xl font-black uppercase">NOT FOUND</h2>

        <div className="space-y-6 text-2xl md:text-3xl font-bold uppercase leading-tight">
          <p>THIS PAGE DOESN&apos;T EXIST.</p>
          <p>JUST LIKE YOUR EXCUSES.</p>
        </div>

        <a
          href="/"
          className="inline-block bg-white text-black px-8 py-4 text-xl font-black uppercase hover:bg-gray-200 transition-colors"
        >
          BACK TO REALITY
        </a>
      </div>
    </div>
  )
}