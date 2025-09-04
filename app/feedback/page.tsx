import { FeedbackForm } from "@/components/feedback-form"

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">FEEDBACK</h1>
          <p className="text-xl md:text-2xl font-bold uppercase">WHAT PROBLEMS DO YOU FACE? WHAT DO YOU WANT?</p>
        </div>

        <div className="space-y-8 text-lg leading-relaxed">
          <div className="border-4 border-white p-6">
            <h2 className="text-2xl font-black mb-4 uppercase">[TELL US EVERYTHING]</h2>
            <p className="mb-4">
              {">"} What problems keep you stuck?
            </p>
            <p className="mb-4">
              {">"} What ideas do you have?
            </p>
            <p>
              {">"} What do you really want to achieve?
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <FeedbackForm />
        </div>
      </div>
    </div>
  )
}