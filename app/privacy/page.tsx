export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">PRIVACY</h1>
          <p className="text-xl md:text-2xl font-bold uppercase">RAW TRUTH ABOUT YOUR DATA</p>
        </div>

        <div className="space-y-8 text-lg leading-relaxed">
          <div className="border-4 border-white p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">[WHAT WE COLLECT]</h2>
            <p className="mb-4">
              {">"} Email addresses (for waitlist and optional contact)
            </p>
            <p className="mb-4">
              {">"} Names (optional, when you provide them)
            </p>
            <p className="mb-4">
              {">"} Feedback, reviews, and opinions (what you submit)
            </p>
            <p>
              {">"} Basic technical data (IP address for rate limiting)
            </p>
          </div>

          <div className="border-4 border-white p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">[WHY WE COLLECT IT]</h2>
            <p className="mb-4">
              {">"} To notify you about BRUTAL updates and launches
            </p>
            <p className="mb-4">
              {">"} To understand what you want and need
            </p>
            <p className="mb-4">
              {">"} To improve our brutal approach
            </p>
            <p>
              {">"} To prevent spam and abuse
            </p>
          </div>

          <div className="border-4 border-white p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">[HOW WE PROTECT IT]</h2>
            <p className="mb-4">
              {">"} Encrypted database connections (SSL/TLS)
            </p>
            <p className="mb-4">
              {">"} Rate limiting to prevent abuse
            </p>
            <p className="mb-4">
              {">"} Input sanitization and validation
            </p>
            <p>
              {">"} No sharing with third parties (we keep it brutal, not betraying)
            </p>
          </div>

          <div className="border-4 border-white p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">[YOUR RIGHTS]</h2>
            <p className="mb-4">
              {">"} Request deletion of your data
            </p>
            <p className="mb-4">
              {">"} Request a copy of what we have
            </p>
            <p className="mb-4">
              {">"} Opt out of communications anytime
            </p>
            <p>
              {">"} Contact us: ns8583874@gmail.com
            </p>
          </div>

          <div className="border-4 border-white p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">[DATA RETENTION]</h2>
            <p className="mb-4">
              {">"} Waitlist data: Until you request deletion or we launch
            </p>
            <p className="mb-4">
              {">"} Feedback data: 2 years for product development
            </p>
            <p>
              {">"} Technical logs: 30 days maximum
            </p>
          </div>

          <div className="border-4 border-white p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">[COOKIES & TRACKING]</h2>
            <p className="mb-4">
              {">"} No tracking cookies
            </p>
            <p className="mb-4">
              {">"} No analytics (yet)
            </p>
            <p>
              {">"} Just essential functionality
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-lg font-bold uppercase">LAST UPDATED: JANUARY 2025</p>
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