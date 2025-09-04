// Environment variable validation
export function validateEnvironment() {
  const requiredEnvVars = {
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
  }

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    )
  }

  // Validate database URL format
  const dbUrl = process.env.POSTGRES_URL_NON_POOLING
  if (dbUrl && !dbUrl.startsWith('postgresql://')) {
    throw new Error('POSTGRES_URL_NON_POOLING must be a valid PostgreSQL connection string')
  }

  return requiredEnvVars
}

// Get validated environment variables
export const env = validateEnvironment()