import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"
import { isValidEmail, sanitizeInput, checkRateLimit } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimit = checkRateLimit(`reviews-${clientIP}`, 3, 60000) // 3 requests per minute
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const { name, email, review, idea_opinion, suggestion } = await request.json()

    // Validate that at least one required field is provided
    if (!review?.trim() && !idea_opinion?.trim()) {
      return NextResponse.json({ error: "At least one review or opinion must be provided" }, { status: 400 })
    }

    // Validate email if provided
    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedName = name ? sanitizeInput(name, 100) : null
    const sanitizedEmail = email ? sanitizeInput(email.toLowerCase(), 254) : null
    const sanitizedReview = review ? sanitizeInput(review, 2000) : null
    const sanitizedIdeaOpinion = idea_opinion ? sanitizeInput(idea_opinion, 2000) : null
    const sanitizedSuggestion = suggestion ? sanitizeInput(suggestion, 2000) : null

    const sql = neon(process.env.POSTGRES_URL_NON_POOLING!)

    // Ensure reviews table exists
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS reviews (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT,
          email TEXT,
          review TEXT,
          idea_opinion TEXT,
          suggestion TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `
    } catch (dbError) {
      console.error("Database setup error:", dbError)
      return NextResponse.json({ error: "Database setup failed" }, { status: 500 })
    }

    // Insert review entry
    await sql`
      INSERT INTO reviews (name, email, review, idea_opinion, suggestion, created_at) 
      VALUES (
        ${sanitizedName}, 
        ${sanitizedEmail}, 
        ${sanitizedReview}, 
        ${sanitizedIdeaOpinion}, 
        ${sanitizedSuggestion},
        NOW()
      )
    `

    return NextResponse.json(
      {
        message: "Your review is locked in.",
        redirect: "/noted",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Reviews API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}