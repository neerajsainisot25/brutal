// Enhanced email validation utility
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  
  // RFC 5322 compliant regex (simplified but more robust)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  return emailRegex.test(email) && 
         email.length <= 254 && 
         email.length >= 5 &&
         !email.includes('..') && // No consecutive dots
         !email.startsWith('.') && 
         !email.endsWith('.')
}

// Enhanced input sanitization with comprehensive XSS prevention
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') return ''
  
  return input
    .trim()
    .slice(0, maxLength)
    // Remove potentially dangerous characters and patterns
    .replace(/[<>'"&]/g, '') // XSS prevention
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/\0/g, '') // Remove null bytes
}

// Validate and sanitize name input
export function validateName(name: string): { isValid: boolean; sanitized: string; error?: string } {
  if (!name || typeof name !== 'string') {
    return { isValid: false, sanitized: '', error: 'Name is required' }
  }
  
  const sanitized = sanitizeInput(name, 100)
  
  if (sanitized.length < 1) {
    return { isValid: false, sanitized: '', error: 'Name cannot be empty' }
  }
  
  if (sanitized.length > 100) {
    return { isValid: false, sanitized: '', error: 'Name is too long' }
  }
  
  // Only allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/
  if (!nameRegex.test(sanitized)) {
    return { isValid: false, sanitized: '', error: 'Name contains invalid characters' }
  }
  
  return { isValid: true, sanitized }
}

// Enhanced rate limiting store with cleanup (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number; firstRequest: number }>()
let lastCleanup = Date.now()

// Cleanup function to prevent memory leaks
function cleanupRateLimit() {
  const now = Date.now()
  
  // Only cleanup every 10 minutes to avoid performance issues
  if (now - lastCleanup < 600000) return
  
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime + 600000) { // 10 minutes after reset
      rateLimitStore.delete(key)
    }
  }
  
  lastCleanup = now
}

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 5, 
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  if (!identifier || typeof identifier !== 'string') {
    return { allowed: false, remaining: 0, resetTime: Date.now() + windowMs }
  }
  
  // Cleanup old entries periodically
  cleanupRateLimit()
  
  const now = Date.now()
  const key = `rate_limit:${identifier}`
  
  const current = rateLimitStore.get(key)
  
  if (!current || now > current.resetTime) {
    // Reset or initialize
    const resetTime = now + windowMs
    rateLimitStore.set(key, { count: 1, resetTime, firstRequest: now })
    return { allowed: true, remaining: maxRequests - 1, resetTime }
  }
  
  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime }
  }
  
  // Increment count
  current.count++
  rateLimitStore.set(key, current)
  
  return { 
    allowed: true, 
    remaining: maxRequests - current.count, 
    resetTime: current.resetTime 
  }
}

// IP validation and normalization
export function normalizeIP(ip: string | null): string {
  if (!ip) return 'unknown'
  
  // Handle IPv6 mapped IPv4 addresses
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7)
  }
  
  // Basic IP validation
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
  
  if (ipv4Regex.test(ip) || ipv6Regex.test(ip)) {
    return ip
  }
  
  return 'invalid'
}