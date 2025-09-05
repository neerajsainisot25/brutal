import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"
import { isValidEmail, sanitizeInput, checkRateLimit, normalizeIP, validateName } from "@/lib/validation"
import { logger } from "@/lib/logger"

// Allowed HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function POST(request: NextRequest) {
  // Extract client IP outside try block for error logging
  const clientIP = normalizeIP(
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
  
  try {
    // Enhanced IP extraction and validation
    
    // Stricter rate limiting: 3 requests per minute per IP
    const rateLimit = checkRateLimit(clientIP, 3, 60000)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Validate Content-Type
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    const { email, name } = body

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Validate and sanitize name if provided
    let sanitizedName = null
    if (name) {
      const nameValidation = validateName(name)
      if (!nameValidation.isValid) {
        return NextResponse.json({ error: nameValidation.error }, { status: 400 })
      }
      sanitizedName = nameValidation.sanitized
    }

    // Sanitize email
    const sanitizedEmail = sanitizeInput(email.toLowerCase().trim(), 254)

    // Validate database connection
    if (!process.env.POSTGRES_URL_NON_POOLING) {
      console.error("Database URL not configured")
      return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 })
    }

    const sql = neon(process.env.POSTGRES_URL_NON_POOLING)

    // Ensure waitlist table exists with proper constraints and handle migrations
    try {
      // First, create the table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL CHECK (length(email) > 0 AND length(email) <= 254),
          name TEXT CHECK (name IS NULL OR (length(name) > 0 AND length(name) <= 100)),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `
      
      // Add missing columns if they don't exist (migration)
      const existingColumns = await sql`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'waitlist'
      `
      
      const columnNames = existingColumns.map(col => col.column_name)
      
      // Add ip_address column if missing
      if (!columnNames.includes('ip_address')) {
        await sql`ALTER TABLE waitlist ADD COLUMN ip_address INET`
      }
      
      // Add updated_at column if missing
      if (!columnNames.includes('updated_at')) {
        await sql`ALTER TABLE waitlist ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
      }
      
      // Create indexes for performance
      await sql`
        CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email)
      `
      
      // Create index on created_at for analytics
      await sql`
        CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at)
      `
      
      // Create index on ip_address for rate limiting queries
      await sql`
        CREATE INDEX IF NOT EXISTS idx_waitlist_ip_address ON waitlist(ip_address)
      `
    } catch (dbError) {
      logger.error("Database setup error", dbError, { ip: clientIP })
      return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 })
    }

    // Check if email already exists (case-insensitive)
    const existing = await sql`
      SELECT email FROM waitlist WHERE LOWER(email) = LOWER(${sanitizedEmail}) LIMIT 1
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

    // Insert new waitlist entry with IP tracking
    await sql`
      INSERT INTO waitlist (email, name, ip_address, created_at, updated_at) 
      VALUES (${sanitizedEmail}, ${sanitizedName}, ${clientIP === 'unknown' || clientIP === 'invalid' ? null : clientIP}, NOW(), NOW())
    `

    return NextResponse.json(
      {
        message: "You're in.",
        redirect: "/thanks",
      },
      { 
        status: 201,
        headers: {
          'X-RateLimit-Limit': '3',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString()
        }
      },
    )
  } catch (error) {
    logger.error("Waitlist API error", error, { 
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

// Explicitly handle other HTTP methods
export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function PATCH() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
