import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, ideas, views, suggestions, wants } = await request.json()

    // Validate that at least one message field is provided
    if (!ideas?.trim() && !views?.trim() && !suggestions?.trim() && !wants?.trim()) {
      return NextResponse.json({ error: "At least one field must be filled" }, { status: 400 })
    }

    // Sanitize inputs (basic sanitization and length limits)
    const sanitize = (text: string) => text?.trim().slice(0, 1000) || null

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
      console.error("Database setup error:", dbError)
      return NextResponse.json({ error: "Database setup failed" }, { status: 500 })
    }

    // Insert feedback entry
    await sql`
      INSERT INTO feedback (name, email, ideas, views, suggestions, wants, created_at) 
      VALUES (
        ${name?.trim() || null}, 
        ${email?.trim() || null}, 
        ${sanitize(ideas)}, 
        ${sanitize(views)}, 
        ${sanitize(suggestions)}, 
        ${sanitize(wants)},
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
    console.error("Feedback API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
