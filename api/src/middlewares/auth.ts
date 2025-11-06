import jwt, { SignOptions } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User, { IUser } from '../models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser & { roles?: string[] }
    }
  }
}

/**
 * Generate JWT token for user
 * @param user - User object
 * @returns JWT token
 */
export const generateToken = (user: IUser): string => {
  const payload = {
    userId: user._id,
    email: user.email,
    tenant: user.tenant,
    roles: [] // We'll populate this later from database
  }

  const options: SignOptions = { expiresIn: '24h' }

  return jwt.sign(payload, JWT_SECRET as string, options)
}

/**
 * Authentication middleware - verifies JWT token
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Access token required' })
      return
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any

    // Get user from database
    const user = await User.findById(decoded.userId)
      .populate('tenant', 'name')

    if (!user) {
      res.status(401).json({ error: 'User not found' })
      return
    }

    // Attach user to request object
    req.user = user
    req.user.roles = decoded.roles || []

    next()
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Token expired' })
      return
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Invalid token' })
      return
    }

    console.error('Authentication error:', error)
    res.status(500).json({ error: 'Authentication failed' })
  }
}

/**
 * Optional authentication middleware - doesn't fail if no token
 */
export const optionalAuthenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = undefined
      next()
      return
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as any

    const user = await User.findById(decoded.userId)
      .populate('tenant', 'name')

    if (user) {
      req.user = user
      req.user.roles = decoded.roles || []
    } else {
      req.user = undefined
    }

    next()
  } catch (error) {
    // For optional auth, just set user to null and continue
    req.user = undefined
    next()
  }
}

/**
 * Admin-only middleware - requires super_admin role
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }

  if (!req.user.roles?.includes('super_admin')) {
    res.status(403).json({ error: 'Admin access required' })
    return
  }

  next()
}

/**
 * Tenant admin middleware - requires tenant_admin or super_admin role
 */
export const requireTenantAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }

  if (!req.user.roles?.includes('super_admin') && !req.user.roles?.includes('tenant_admin')) {
    res.status(403).json({ error: 'Tenant admin access required' })
    return
  }

  next()
}