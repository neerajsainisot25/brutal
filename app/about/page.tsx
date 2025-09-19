import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
            ABOUT
          </h1>
          <p className="text-xl md:text-2xl font-bold uppercase">
            NO SUGAR COATING. JUST TRUTH.
          </p>
          <p className="text-base md:text-lg text-gray-400">
            Here’s a glimpse—just enough to keep you guessing.
          </p>
        </div>

        {/* Core Sections */}
        <section className="space-y-12 text-lg leading-relaxed">
          {/* What */}
          <div className="border-4 border-white p-8">
            <h2 className="text-3xl font-black mb-6 uppercase">[WHAT IS BRUTAL?]</h2>
            <p className="mb-4">{">"} BRUTAL is not just an app. It&apos;s a movement.</p>
            <p className="mb-4">{">"} We strip away the noise, the filters, the fake positivity.</p>
            <p>{">"} What remains is raw, honest, transformative truth—delivered with precision.</p>
          </div>

          {/* Why */}
          <div className="border-4 border-white p-8">
            <h2 className="text-3xl font-black mb-6 uppercase">[WHY BRUTAL?]</h2>
            <p className="mb-4">{">"} Because gentle lies won&apos;t change your life.</p>
            <p className="mb-4">{">"} Because comfort zones are where dreams go to die.</p>
            <p>{">"} Because you deserve the unvarnished truth about your potential.</p>
          </div>

          {/* Mission */}
          <div className="border-4 border-white p-8">
            <h2 className="text-3xl font-black mb-6 uppercase">[THE MISSION]</h2>
            <p className="mb-4">{">"} To create tools that don&apos;t coddle.</p>
            <p className="mb-4">{">"} To build experiences that challenge and evolve with you.</p>
            <p>{">"} To deliver results that matter—relentlessly.</p>
          </div>

          {/* Glimpse of the App & Assistant */}
          <div className="border-4 border-white p-8 bg-gradient-to-b from-black to-gray-900">
            <h2 className="text-3xl font-black mb-6 uppercase">[A GLIMPSE INSIDE]</h2>
            <p className="mb-4 text-gray-300">
              {">"} Meet the <span className="font-bold text-white">Brutal Assistant</span>—
              your unfiltered AI mentor that calls you out, guides your glow-up, and tracks every move.
            </p>
            <p className="mb-4 text-gray-300">
              {">"} Explore the <span className="font-bold text-white">Glow-Up Engine</span>—
              a hidden core that analyzes, adapts, and demands progress.
            </p>

            {/* Visual Teasers */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Phone/App mockup placeholder */}
              <div className="relative w-full aspect-[9/16] border-2 border-gray-700 rounded-2xl overflow-hidden">
                {/* Replace /app-preview.png with real screenshot or animation */}
                <Image
                  src="/app-preview.png"
                  alt="Brutal App Preview"
                  fill
                  className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              {/* Animated AI Assistant silhouette */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full border-2 border-gray-400"></div>
                </div>
                <p className="text-gray-400 italic text-sm">
                  A presence you can feel—before you hear it speak.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-gray-500 italic">
              We won’t reveal the rest. Not yet.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center space-y-4">
          <a
            href="/"
            className="inline-block bg-white text-black px-8 py-4 text-xl font-black uppercase hover:bg-gray-200 transition-colors"
          >
            BACK TO BRUTAL
          </a>
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Launch sequence in motion. Stay tuned.
          </p>
        </div>
      </div>
    </div>
  )
}
