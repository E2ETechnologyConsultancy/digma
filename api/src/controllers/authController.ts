import { Request, Response } from 'express'
import User from '../models/User'
import Tenant from '../models/Tenant'
import { generateToken } from '../middlewares/auth'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, tenantId } = req.body

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({
        error: 'Name, email, and password are required'
      })
      return
    }

    if (password.length < 6) {
      res.status(400).json({
        error: 'Password must be at least 6 characters long'
      })
      return
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      res.status(400).json({
        error: 'User with this email already exists'
      })
      return
    }

    // Determine tenant
    let userTenantId = tenantId

    // If no tenant specified and user is not super admin, use default tenant
    if (!userTenantId) {
      // For registration, we'll use the first available tenant or create a default one
      const defaultTenant = await Tenant.findOne({ name: 'default-tenant' })
      if (defaultTenant) {
        userTenantId = defaultTenant._id
      } else {
        // Create default tenant if it doesn't exist
        const newTenant = await Tenant.create({
          name: 'default-tenant',
          meta: { description: 'Default tenant for new users' }
        })
        userTenantId = newTenant._id
      }
    }

    // Verify tenant exists
    const tenant = await Tenant.findById(userTenantId)
    if (!tenant) {
      res.status(400).json({ error: 'Invalid tenant' })
      return
    }

    // Create user
    const user = await User.createUser({
      name,
      email: email.toLowerCase(),
      tenant: userTenantId,
      password
    })

    // Get user roles
    const roles = await user.getRoles()

    // Generate token
    const token = generateToken(user)

    // Populate tenant info
    await user.populate('tenant', 'name')

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        tenant: user.tenant,
        roles,
        createdAt: user.createdAt
      },
      token,
      message: 'User registered successfully'
    })

  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ error: 'Registration failed' })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      res.status(400).json({
        error: 'Email and password are required'
      })
      return
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() }).populate('tenant', 'name')
    if (!user) {
      res.status(401).json({
        error: 'Invalid email or password'
      })
      return
    }

    // Check password
    const isValidPassword = await user.checkPassword(password)
    if (!isValidPassword) {
      res.status(401).json({
        error: 'Invalid email or password'
      })
      return
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({
        error: 'Account is deactivated'
      })
      return
    }

    // Get user roles
    const roles = await user.getRoles()

    // Update last login
    await user.updateLastLogin()

    // Generate token
    const token = generateToken(user)

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        tenant: user.tenant,
        roles,
        lastLogin: user.lastLogin
      },
      token,
      message: 'Login successful'
    })

  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
}

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user

    if (!user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    // Get fresh user data with roles
    const freshUser = await User.findById(user._id)
      .populate('tenant', 'name')

    if (!freshUser) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const roles = await freshUser.getRoles()
    const permissions = await freshUser.getPermissions(user.tenant?._id?.toString())

    res.json({
      user: {
        id: freshUser._id,
        name: freshUser.name,
        email: freshUser.email,
        tenant: freshUser.tenant,
        roles,
        permissions,
        isActive: freshUser.isActive,
        lastLogin: freshUser.lastLogin,
        createdAt: freshUser.createdAt
      }
    })

  } catch (err) {
    console.error('Get profile error:', err)
    res.status(500).json({ error: 'Failed to get profile' })
  }
}

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = req.user

    if (!user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        error: 'Current password and new password are required'
      })
      return
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        error: 'New password must be at least 6 characters long'
      })
      return
    }

    // Get full user object
    const fullUser = await User.findById(user._id)
    if (!fullUser) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // Verify current password
    const isValidCurrentPassword = await fullUser.checkPassword(currentPassword)
    if (!isValidCurrentPassword) {
      res.status(400).json({
        error: 'Current password is incorrect'
      })
      return
    }

    // Update password
    await fullUser.setPassword(newPassword)
    await fullUser.save()

    res.json({
      message: 'Password changed successfully'
    })

  } catch (err) {
    console.error('Change password error:', err)
    res.status(500).json({ error: 'Failed to change password' })
  }
}

export const logout = (req: Request, res: Response): void => {
  // For JWT, logout is handled client-side by removing the token
  // In a production system, you might want to implement token blacklisting
  res.json({
    message: 'Logged out successfully'
  })
}