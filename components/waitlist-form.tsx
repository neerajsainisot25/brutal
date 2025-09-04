"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedEmail = email.trim()
    
    if (!trimmedEmail) {
      setMessage("Email is required")
      return
    }

    // Enhanced client-side email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    
    if (!emailRegex.test(trimmedEmail) || 
        trimmedEmail.length > 254 || 
        trimmedEmail.length < 5 ||
        trimmedEmail.includes('..') ||
        trimmedEmail.startsWith('.') ||
        trimmedEmail.endsWith('.')) {
      setMessage("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setMessage("")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
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

      if (data.redirect) {
        setMessage("Success! Redirecting...")
        setTimeout(() => router.push(data.redirect), 1000)
      } else {
        setMessage(data.message || "Success!")
        setEmail("")
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
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="YOUR.EMAIL@DOMAIN.COM"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          aria-label="Email address"
          className="border-4 border-black rounded-none text-lg p-4 font-mono bg-white focus:bg-black focus:text-white focus:outline-none"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 font-black tracking-wider border-4 border-black rounded-none"
        >
          {isLoading ? "[PROCESSING...]" : "[SUBMIT TO BRUTALISM]"}
        </Button>
      </div>
      {message && (
        <p
          className={`text-sm mt-4 font-bold ${message.includes("error") || message.includes("wrong") ? "text-red-600" : ""}`}
        >
          {">"} {message.toUpperCase()}
        </p>
      )}
      {!message && <p className="text-sm mt-4 font-bold">{">"} WARNING: SIDE EFFECTS MAY INCLUDE ENLIGHTENMENT</p>}
    </form>
  )
}
