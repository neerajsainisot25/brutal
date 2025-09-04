import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

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
      SELECT email FROM waitlist WHERE email = ${email.toLowerCase()} LIMIT 1
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
      VALUES (${email.toLowerCase()}, ${name || null}, NOW())
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
        error: "Failed to join waitlist",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
