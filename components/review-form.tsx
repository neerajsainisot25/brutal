"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ReviewForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
    idea_opinion: "",
    suggestion: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation: At least one of review or idea_opinion must be filled
    if (!formData.review.trim() && !formData.idea_opinion.trim()) {
      setMessage("Tell us your review OR your opinion on the glow-up concept")
      return
    }

    // Validate email if provided
    if (formData.email.trim()) {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (!emailRegex.test(formData.email.trim())) {
        setMessage("Please enter a valid email address")
        return
      }
    }

    setIsSubmitting(true)
    setMessage("")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error occurred" }))
        
        if (response.status === 429) {
          const retryAfter = response.headers.get('retry-after')
          setMessage(`Too many requests. Try again in ${retryAfter || '60'} seconds.`)
        } else if (response.status >= 500) {
          setMessage("Server error. Please try again later.")
        } else {
          setMessage(errorData.error || "Something went wrong")
        }
        return
      }

      const data = await response.json()
      setMessage(data.message || "Success!")
      
      if (data.redirect) {
        // Clear form on success
        setFormData({
          name: "",
          email: "",
          review: "",
          idea_opinion: "",
          suggestion: "",
        })
        setTimeout(() => {
          window.location.href = data.redirect
        }, 1500)
      }
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setMessage("Request timed out. Please try again.")
        } else {
          setMessage("Network error. Check your connection and try again.")
        }
      } else {
        setMessage("An unexpected error occurred. Please try again.")
      }
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
        placeholder="WHAT'S YOUR FIRST THOUGHT WHEN YOU HEAR 'GLOW UP'?"
        value={formData.idea_opinion}
        onChange={(e) => setFormData((prev) => ({ ...prev, idea_opinion: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
      />

      <Textarea
        placeholder="DOES THIS IDEA MATTER TO YOU? WHY OR WHY NOT?"
        value={formData.review}
        onChange={(e) => setFormData((prev) => ({ ...prev, review: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
      />

      <Textarea
        placeholder="ANY SUGGESTION TO MAKE IT BETTER?"
        value={formData.suggestion}
        onChange={(e) => setFormData((prev) => ({ ...prev, suggestion: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black hover:bg-gray-200 text-xl font-black uppercase py-6"
      >
        {isSubmitting ? "LOCKING IN..." : "LOCK IN YOUR REVIEW"}
      </Button>

      {message && <div className="text-center text-white text-lg font-bold uppercase">{message}</div>}
    </form>
  )
}