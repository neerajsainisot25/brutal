import { FeedbackForm } from "@/components/feedback-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">CONTACT</h1>
          <p className="text-xl md:text-2xl font-bold uppercase">SPEAK YOUR MIND. WE&apos;RE LISTENING.</p>
        </div>

        <div className="flex justify-center">
          <FeedbackForm />
        </div>

        <div className="text-center space-y-4">
          <p className="text-lg font-bold uppercase">OR EMAIL US DIRECTLY:</p>
          <a href="mailto:ns8583874@gmail.com" className="text-2xl font-black uppercase hover:underline">
            NS8583874@GMAIL.COM
          </a>
        </div>
      </div>
    </div>
  )
}
