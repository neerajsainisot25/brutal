import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"
import { isValidEmail, sanitizeInput, checkRateLimit, normalizeIP } from "@/lib/validation"
import { logger } from "@/lib/logger"

export async function POST(request: NextRequest) {
  // Extract client IP outside try block for error logging
  const clientIP = normalizeIP(
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
  
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(`feedback-${clientIP}`, 3, 60000) // 3 requests per minute
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const { name, email, ideas, views, suggestions, wants } = await request.json()

    // Validate that at least one message field is provided
    if (!ideas?.trim() && !views?.trim() && !suggestions?.trim() && !wants?.trim()) {
      return NextResponse.json({ error: "At least one field must be filled" }, { status: 400 })
    }

    // Validate email if provided
    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedName = name ? sanitizeInput(name, 100) : null
    const sanitizedEmail = email ? sanitizeInput(email.toLowerCase(), 254) : null
    const sanitizedIdeas = ideas ? sanitizeInput(ideas, 2000) : null
    const sanitizedViews = views ? sanitizeInput(views, 2000) : null
    const sanitizedSuggestions = suggestions ? sanitizeInput(suggestions, 2000) : null
    const sanitizedWants = wants ? sanitizeInput(wants, 2000) : null

    const sql = neon(process.env.POSTGRES_URL_NON_POOLING!)

    // Ensure feedback table exists
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS feedback (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT,
          email TEXT,
          ideas TEXT,
          views TEXT,
          suggestions TEXT,
          wants TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `
    } catch (dbError) {
      logger.error("Database setup error", dbError, { ip: clientIP })
      return NextResponse.json({ error: "Database setup failed" }, { status: 500 })
    }

    // Insert feedback entry
    await sql`
      INSERT INTO feedback (name, email, ideas, views, suggestions, wants, created_at) 
      VALUES (
        ${sanitizedName}, 
        ${sanitizedEmail}, 
        ${sanitizedIdeas}, 
        ${sanitizedViews}, 
        ${sanitizedSuggestions}, 
        ${sanitizedWants},
        NOW()
      )
    `

    return NextResponse.json(
      {
        message: "We've got your input. Raw and real.",
        redirect: "/noted",
      },
      { status: 201 },
    )
  } catch (error) {
    logger.error("Feedback API error", error, { 
      ip: clientIP,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    })
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    )
  }
}
