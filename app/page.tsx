"use client"

import { Button } from "@/components/ui/button"
import { WaitlistForm } from "@/components/waitlist-form"
import Link from "next/link"

export default function BrutalistLanding() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b-4 border-white p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-black text-white">BRUTAL</div>
          </div>
          <div className="hidden md:flex space-x-6 text-lg">
            <Link href="/about" className="hover:bg-white hover:text-black px-3 py-1 transition-colors duration-100">
              ABOUT
            </Link>
            <Link href="/feedback" className="hover:bg-white hover:text-black px-3 py-1 transition-colors duration-100">
              FEEDBACK
            </Link>
            <Link href="/reviews" className="hover:bg-white hover:text-black px-3 py-1 transition-colors duration-100">
              REVIEWS
            </Link>
            <button
              onClick={scrollToContact}
              className="hover:bg-white hover:text-black px-3 py-1 transition-colors duration-100"
            >
              CONTACT
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-8xl font-black leading-none mb-8 tracking-tighter">
                RAW.
                <br />
                BOLD.
                <br />
                <span className="bg-white text-black px-2">BRUTAL</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                {">"} NO ILLUSIONS. NO COMPROMISE
                <br />
                {">"} NO SHORTCUTS
                <br />
                {">"} NO FILTERS
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    const ctaSection = document.getElementById("cta-section")
                    if (ctaSection) {
                      ctaSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 font-bold tracking-wider border-4 border-white rounded-none"
                >
                  [JOIN NOW →]
                </Button>
                <Link href="/reviews">
                  <Button className="bg-transparent text-white hover:bg-white hover:text-black text-lg px-8 py-6 font-bold tracking-wider border-4 border-white rounded-none">
                    [REVIEW GLOW-UP →]
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 relative overflow-hidden bg-gray-800 flex items-center justify-center">
                <div className="text-white text-2xl font-bold">BRUTAL VISION</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 text-center">[FEATURES]</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-4 border-white p-8 hover:bg-white hover:text-black transition-colors duration-200">
              <h3 className="text-3xl font-black mb-4 tracking-wider">[01] CONFIDENCE</h3>
              <p className="text-lg leading-relaxed">{">"} The only filter you need</p>
            </div>
            <div className="border-4 border-white p-8 hover:bg-white hover:text-black transition-colors duration-200">
              <h3 className="text-3xl font-black mb-4 tracking-wider">[02] PROGRESS</h3>
              <p className="text-lg leading-relaxed">{">"} Tracked. Visible. Undeniable.</p>
            </div>
            <div className="border-4 border-white p-8 hover:bg-white hover:text-black transition-colors duration-200">
              <h3 className="text-3xl font-black mb-4 tracking-wider">[03] TRANSFORMATION</h3>
              <p className="text-lg leading-relaxed">{">"} More than skin deep</p>
            </div>
            <div className="border-4 border-white p-8 hover:bg-white hover:text-black transition-colors duration-200">
              <h3 className="text-3xl font-black mb-4 tracking-wider">[04] PERSONALIZATION</h3>
              <p className="text-lg leading-relaxed">{">"} Built for you. Not for the crowd</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="py-20 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none">
            READY TO
            <br />
            <span className="bg-black text-white px-4">DESTROY</span>
            <br />
            THE NORM?
          </h2>
          <p className="text-xl mb-12 font-bold">
            {">"} JOIN THE BRUTAL REVOLUTION
            <br />
            {">"} NO GOING BACK TO BORING
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/feedback">
              <Button className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4 font-bold tracking-wider border-4 border-black rounded-none">
                [SHARE PROBLEMS →]
              </Button>
            </Link>
            <Link href="/reviews">
              <Button className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4 font-bold tracking-wider border-4 border-black rounded-none">
                [REVIEW CONCEPT →]
              </Button>
            </Link>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div id="contact-section">
              <h3 className="text-2xl font-black mb-4 tracking-wider">[CONTACT]</h3>
              <p className="text-lg">
                {">"} ns8583874@gmail.com
                <br />
                {">"} EARTH, SOLAR SYSTEM
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4 tracking-wider">[FOLLOW]</h3>
              <div className="space-y-2">
                <a
                  href="https://www.instagram.com/brutalist.raw/"
                  className="block text-lg hover:bg-white hover:text-black px-2 py-1 transition-colors"
                >
                  {">"} INSTAGRAM/BRUTAL
                </a>
              </div>
            </div>
          </div>
          <div className="border-t-4 border-white mt-12 pt-8 text-center">
            <p className="text-lg font-bold">© 2025 BRUTAL.RAW </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
