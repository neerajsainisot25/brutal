export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">ABOUT</h1>
          <p className="text-xl md:text-2xl font-bold uppercase">NO SUGAR COATING. JUST TRUTH.</p>
        </div>

        <div className="space-y-12 text-lg leading-relaxed">
          <div className="border-4 border-white p-8">
            <h2 className="text-3xl font-black mb-6 uppercase">[WHAT IS BRUTAL?]</h2>
            <p className="mb-4">
              {">"} BRUTAL is not just an app. It&apos;s a philosophy.
            </p>
            <p className="mb-4">
              {">"} We strip away the noise, the filters, the fake positivity.
            </p>
            <p>
              {">"} What remains is raw, honest, transformative truth.
            </p>
          </div>

          <div className="border-4 border-white p-8">
            <h2 className="text-3xl font-black mb-6 uppercase">[WHY BRUTAL?]</h2>
            <p className="mb-4">
              {">"} Because gentle lies won&apos;t change your life.
            </p>
            <p className="mb-4">
              {">"} Because comfort zones are where dreams go to die.
            </p>
            <p>
              {">"} Because you deserve the unvarnished truth about your potential.
            </p>
          </div>

          <div className="border-4 border-white p-8">
            <h2 className="text-3xl font-black mb-6 uppercase">[THE MISSION]</h2>
            <p className="mb-4">
              {">"} To create tools that don&apos;t coddle.
            </p>
            <p className="mb-4">
              {">"} To build experiences that challenge.
            </p>
            <p>
              {">"} To deliver results that matter.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-white text-black px-8 py-4 text-xl font-black uppercase hover:bg-gray-200 transition-colors"
          >
            BACK TO BRUTAL
          </a>
        </div>
      </div>
    </div>
  )
}