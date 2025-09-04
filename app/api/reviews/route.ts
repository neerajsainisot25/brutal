import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, review, idea_opinion, suggestion } = await request.json()

    // Validate that at least one required field is provided
    if (!review?.trim() && !idea_opinion?.trim()) {
      return NextResponse.json({ error: "At least one review or opinion must be provided" }, { status: 400 })
    }

    // Sanitize inputs (basic sanitization and length limits)
    const sanitize = (text: string) => text?.trim().slice(0, 1000) || null

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
        ${name?.trim() || null}, 
        ${email?.trim() || null}, 
        ${sanitize(review)}, 
        ${sanitize(idea_opinion)}, 
        ${sanitize(suggestion)},
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
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}