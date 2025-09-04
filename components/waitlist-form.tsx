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

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setMessage("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.redirect) {
          setMessage("Redirecting...")
          setTimeout(() => router.push(data.redirect), 1000)
        } else {
          setMessage(data.message)
          setEmail("")
        }
      } else {
        setMessage(data.error || "Something went wrong")
      }
    } catch {
      setMessage("Network error. Check your connection and try again.")
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
