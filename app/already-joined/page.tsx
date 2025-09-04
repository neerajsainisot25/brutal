export default function AlreadyJoinedPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-4xl text-center space-y-12">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">YOU&apos;RE ALREADY</h1>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">PART OF THIS.</h2>

        <div className="space-y-6 text-2xl md:text-3xl font-bold uppercase leading-tight">
          <p>SIT TIGHT.</p>
          <p>WE HAVEN&apos;T FORGOTTEN YOU.</p>
        </div>

        <a
          href="/"
          className="inline-block bg-white text-black px-8 py-4 text-xl font-black uppercase hover:bg-gray-200 transition-colors"
        >
          BACK HOME
        </a>
      </div>
    </div>
  )
}
