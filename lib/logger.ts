// Simple logging utility for production
export const logger = {
  error: (message: string, error?: Error | unknown, context?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString()
    const logData = {
      timestamp,
      level: 'ERROR',
      message,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      } : error,
      context,
    }
    
    console.error(JSON.stringify(logData))
  },
  
  warn: (message: string, context?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString()
    const logData = {
      timestamp,
      level: 'WARN',
      message,
      context,
    }
    
    console.warn(JSON.stringify(logData))
  },
  
  info: (message: string, context?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString()
    const logData = {
      timestamp,
      level: 'INFO',
      message,
      context,
    }
    
    console.info(JSON.stringify(logData))
  },
  
  debug: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString()
      const logData = {
        timestamp,
        level: 'DEBUG',
        message,
        context,
      }
      
      console.debug(JSON.stringify(logData))
    }
  }
}