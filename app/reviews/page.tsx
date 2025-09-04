import { ReviewForm } from "@/components/review-form"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">REVIEW</h1>
          <p className="text-xl md:text-2xl font-bold uppercase">TELL US WHAT YOU REALLY THINK ABOUT GLOW-UP</p>
        </div>

        <div className="space-y-8 text-lg leading-relaxed">
          <div className="border-4 border-white p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">[THE GLOW-UP CONCEPT]</h2>
            <p className="mb-4">
              {">"} Real transformation. No fake filters.
            </p>
            <p className="mb-4">
              {">"} Track your progress. See your growth.
            </p>
            <p>
              {">"} Build confidence through brutal honesty.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <ReviewForm />
        </div>

        <div className="text-center space-y-4">
          <p className="text-lg font-bold uppercase">RAW TRUTH ONLY. NO SUGAR COATING.</p>
        </div>
      </div>
    </div>
  )
}