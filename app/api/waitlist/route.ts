import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"
import { isValidEmail, sanitizeInput, checkRateLimit } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimit = checkRateLimit(clientIP, 5, 60000) // 5 requests per minute
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString()
          }
        }
      )
    }

    const { email, name } = await request.json()

    // Validate email properly
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email.toLowerCase(), 254)
    const sanitizedName = name ? sanitizeInput(name, 100) : null

    const sql = neon(process.env.POSTGRES_URL_NON_POOLING!)

    // Ensure waitlist table exists
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          name TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `
    } catch (dbError) {
      console.error("Database setup error:", dbError)
      return NextResponse.json({ error: "Database setup failed" }, { status: 500 })
    }

    // Check if email already exists
    const existing = await sql`
      SELECT email FROM waitlist WHERE email = ${sanitizedEmail} LIMIT 1
    `

    if (existing.length > 0) {
      return NextResponse.json(
        {
          message: "You're already part of this.",
          redirect: "/already",
        },
        { status: 200 },
      )
    }

    // Insert new waitlist entry
    await sql`
      INSERT INTO waitlist (email, name, created_at) 
      VALUES (${sanitizedEmail}, ${sanitizedName}, NOW())
    `

    return NextResponse.json(
      {
        message: "You're in.",
        redirect: "/thanks",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Waitlist API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
