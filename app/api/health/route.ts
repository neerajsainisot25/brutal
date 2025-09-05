import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if database URL is configured
    if (!process.env.POSTGRES_URL_NON_POOLING) {
      return NextResponse.json({ 
        status: "error", 
        message: "Database not configured",
        database: false,
        timestamp: new Date().toISOString()
      }, { status: 503 })
    }

    const sql = neon(process.env.POSTGRES_URL_NON_POOLING)

    // Test database connection
    const result = await sql`SELECT NOW() as current_time, version() as db_version`
    
    // Check if waitlist table exists and get its structure
    const tableInfo = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'waitlist'
      ORDER BY ordinal_position
    `

    // Count waitlist entries
    let waitlistCount = 0
    try {
      const countResult = await sql`SELECT COUNT(*) as count FROM waitlist`
      waitlistCount = parseInt(countResult[0].count)
    } catch {
      // Table might not exist yet
    }

    return NextResponse.json({
      status: "healthy",
      database: true,
      timestamp: new Date().toISOString(),
      db_time: result[0].current_time,
      db_version: result[0].db_version,
      waitlist_table: {
        exists: tableInfo.length > 0,
        columns: tableInfo,
        total_entries: waitlistCount
      }
    })

  } catch (error) {
    return NextResponse.json({
      status: "error",
      database: false,
      message: error instanceof Error ? error.message : "Unknown database error",
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }
}