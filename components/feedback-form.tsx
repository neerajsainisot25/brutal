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
    
    // Validate that at least one field is filled
    const hasContent = Object.values(formData).some(value => value.trim().length > 0)
    if (!hasContent) {
      setMessage("Please fill at least one field")
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
      const response = await fetch("/api/feedback", {
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
          ideas: "",
          views: "",
          suggestions: "",
          wants: "",
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
          aria-label="Your name (optional)"
          maxLength={100}
        />
        <Input
          type="email"
          placeholder="EMAIL (OPTIONAL)"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase"
          aria-label="Your email address (optional)"
          maxLength={254}
        />
      </div>

      <Textarea
        placeholder="WHAT PROBLEM DO YOU FACE?"
        value={formData.ideas}
        onChange={(e) => setFormData((prev) => ({ ...prev, ideas: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
        aria-label="Describe problems you face"
        maxLength={2000}
      />

      <Textarea
        placeholder="WHAT IDEA DO YOU HAVE?"
        value={formData.views}
        onChange={(e) => setFormData((prev) => ({ ...prev, views: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
        aria-label="Share your ideas"
        maxLength={2000}
      />

      <Textarea
        placeholder="WHAT DO YOU REALLY WANT?"
        value={formData.wants}
        onChange={(e) => setFormData((prev) => ({ ...prev, wants: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
        aria-label="Tell us what you really want"
        maxLength={2000}
      />

      <Textarea
        placeholder="ANY SUGGESTIONS?"
        value={formData.suggestions}
        onChange={(e) => setFormData((prev) => ({ ...prev, suggestions: e.target.value }))}
        className="bg-black border-white text-white placeholder:text-gray-400 text-lg font-bold uppercase min-h-24"
        aria-label="Share your suggestions"
        maxLength={2000}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-black hover:bg-gray-200 text-xl font-black uppercase py-6"
      >
        {isSubmitting ? "SENDING..." : "SUBMIT RAW THOUGHTS"}
      </Button>

      {message && (
        <div 
          className={`text-center text-lg font-bold uppercase ${
            message.includes('error') || message.includes('wrong') || message.includes('invalid') || message.includes('required') 
              ? 'text-red-400' 
              : message.includes('Success') || message.includes('locked') || message.includes('got your')
              ? 'text-green-400'
              : 'text-white'
          }`}
          role="alert"
          aria-live="polite"
        >
          {message}
        </div>
      )}
    </form>
  )
}
