#!/usr/bin/env node

/**
 * Database Migration Script
 * Fixes the waitlist table schema to include ip_address column
 */

const { neon } = require('@neondatabase/serverless')

// Load environment variables manually
const fs = require('fs')
const path = require('path')

function loadEnvFile(filePath) {
  try {
    const envFile = fs.readFileSync(filePath, 'utf8')
    envFile.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim()
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
    })
  } catch (error) {
    // File doesn't exist, ignore
  }
}

// Load .env.local first, then .env
loadEnvFile('.env.local')
loadEnvFile('.env')

async function migrateDatabase() {
  console.log('🔧 Starting database migration...')
  
  if (!process.env.POSTGRES_URL_NON_POOLING) {
    console.error('❌ Error: POSTGRES_URL_NON_POOLING not found in environment variables')
    console.log('Make sure you have a .env or .env.local file with your database URL')
    process.exit(1)
  }

  try {
    const sql = neon(process.env.POSTGRES_URL_NON_POOLING)
    
    console.log('📊 Checking current database schema...')
    
    // Check if waitlist table exists
    const tableExists = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'waitlist'
    `
    
    if (tableExists.length === 0) {
      console.log('📋 Creating waitlist table...')
      await sql`
        CREATE TABLE waitlist (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL CHECK (length(email) > 0 AND length(email) <= 254),
          name TEXT CHECK (name IS NULL OR (length(name) > 0 AND length(name) <= 100)),
          ip_address INET,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `
      console.log('✅ Waitlist table created successfully')
    } else {
      console.log('📋 Waitlist table exists, checking columns...')
      
      // Check current columns
      const columns = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'waitlist'
        ORDER BY ordinal_position
      `
      
      console.log('Current columns:', columns.map(c => `${c.column_name} (${c.data_type})`).join(', '))
      
      // Check for missing columns and add them
      const columnNames = columns.map(col => col.column_name)
      
      if (!columnNames.includes('ip_address')) {
        console.log('🔧 Adding missing ip_address column...')
        await sql`ALTER TABLE waitlist ADD COLUMN ip_address INET`
        console.log('✅ ip_address column added successfully')
      } else {
        console.log('✅ ip_address column already exists')
      }
      
      if (!columnNames.includes('updated_at')) {
        console.log('🔧 Adding missing updated_at column...')
        await sql`ALTER TABLE waitlist ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
        console.log('✅ updated_at column added successfully')
      } else {
        console.log('✅ updated_at column already exists')
      }
    }
    
    // Create or update indexes
    console.log('📈 Creating/updating indexes...')
    
    await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at)`
    await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_ip_address ON waitlist(ip_address)`
    
    console.log('✅ Indexes created/updated successfully')
    
    // Get final table info
    const finalColumns = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'waitlist'
      ORDER BY ordinal_position
    `
    
    const entryCount = await sql`SELECT COUNT(*) as count FROM waitlist`
    
    console.log('\n🎉 Migration completed successfully!')
    console.log('📊 Final table structure:')
    finalColumns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} ${col.is_nullable === 'YES' ? '(nullable)' : '(required)'}`)
    })
    console.log(`📈 Total waitlist entries: ${entryCount[0].count}`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    console.error('Full error:', error)
    process.exit(1)
  }
}

// Run migration
migrateDatabase().catch(console.error)