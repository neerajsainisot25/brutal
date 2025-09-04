export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
          404
        </h1>
        <p className="text-2xl font-bold uppercase">
          PAGE NOT FOUND
        </p>
        <p className="text-lg">
          {">"} THE BRUTAL TRUTH: THIS PAGE DOESN'T EXIST
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="bg-white text-black px-6 py-3 font-black uppercase hover:bg-gray-200 transition-colors border-4 border-white"
          >
            GO HOME
          </a>
          <a
            href="/feedback"
            className="bg-transparent text-white px-6 py-3 font-black uppercase hover:bg-white hover:text-black transition-colors border-4 border-white"
          >
            REPORT ISSUE
          </a>
        </div>
      </div>
    </div>
  )
}