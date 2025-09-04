"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ideas: "",
    views: "",
    suggestions: "",
    wants: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        if (data.redirect) {
          setTimeout(() => (window.location.href = data.redirect), 1500)
        }
      } else {
        setMessage(data.error || "Something went wrong")
      }
    } catch {
      setMessage("Network error. Try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="NAME (OPTIONAL)"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase"
        />
        <Input
          type="email"
          placeholder="EMAIL (OPTIONAL)"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase"
        />
      </div>

      <Textarea
        placeholder="WHAT PROBLEM DO YOU FACE?"
        value={formData.ideas}
        onChange={(e) => setFormData((prev) => ({ ...prev, ideas: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
      />

      <Textarea
        placeholder="WHAT IDEA DO YOU HAVE?"
        value={formData.views}
        onChange={(e) => setFormData((prev) => ({ ...prev, views: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
      />

      <Textarea
        placeholder="WHAT DO YOU REALLY WANT?"
        value={formData.wants}
        onChange={(e) => setFormData((prev) => ({ ...prev, wants: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
      />

      <Textarea
        placeholder="ANY SUGGESTIONS?"
        value={formData.suggestions}
        onChange={(e) => setFormData((prev) => ({ ...prev, suggestions: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black hover:bg-gray-200 text-xl font-black uppercase py-6"
      >
        {isSubmitting ? "SENDING..." : "SUBMIT RAW THOUGHTS"}
      </Button>

      {message && <div className="text-center text-white text-lg font-bold uppercase">{message}</div>}
    </form>
  )
}
