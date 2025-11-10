const User = require('../models/User')

/**
 * RBAC Middleware for authorization checks
 * @param {string} resource - The resource being accessed (e.g., 'user', 'tenant')
 * @param {string} action - The action being performed (e.g., 'read', 'create')
 * @param {Object} options - Additional options
 * @param {boolean} options.allowSystemAdmin - Whether to allow system-wide admin override
 * @param {boolean} options.requireTenantMatch - Whether user must belong to the same tenant
 */
const requirePermission = (resource, action, options = {}) => {
  return async (req, res, next) => {
    try {
      // Get user from request (assuming auth middleware sets req.user)
      const user = req.user
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' })
      }

      // Get tenant context from request
      const tenantId = req.params.tenantId || req.body.tenantId || req.query.tenantId || user.tenant

      // Check if user has the required permission
      const hasPermission = await user.hasPermission(resource, action, tenantId)

      if (!hasPermission) {
        // Check for system admin override if enabled
        if (options.allowSystemAdmin) {
          const isSystemAdmin = await user.hasRole('super_admin')
          if (isSystemAdmin) {
            return next() // Allow system admin to bypass
          }
        }

        return res.status(403).json({
          error: 'Insufficient permissions',
          required: `${resource}:${action}`,
          user: user._id
        })
      }

      // Check tenant ownership if required
      if (options.requireTenantMatch && tenantId && user.tenant.toString() !== tenantId.toString()) {
        // Allow if user is system admin or tenant admin for this tenant
        const isTenantAdmin = await user.hasRole('tenant_admin', tenantId)
        const isSystemAdmin = await user.hasRole('super_admin')

        if (!isTenantAdmin && !isSystemAdmin) {
          return res.status(403).json({
            error: 'Access denied: tenant mismatch',
            userTenant: user.tenant,
            requestedTenant: tenantId
          })
        }
      }

      next()
    } catch (error) {
      console.error('RBAC middleware error:', error)
      res.status(500).json({ error: 'Authorization check failed' })
    }
  }
}

/**
 * Middleware to check if user has any of the specified roles
 * @param {string[]} roleNames - Array of role names to check
 * @param {Object} options - Additional options
 * @param {boolean} options.allowSystemAdmin - Whether to allow system admin override
 */
const requireRole = (roleNames, options = {}) => {
  return async (req, res, next) => {
    try {
      const user = req.user
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' })
      }

      const tenantId = req.params.tenantId || req.body.tenantId || req.query.tenantId

      // Check if user has any of the required roles
      let hasRequiredRole = false
      for (const roleName of roleNames) {
        if (await user.hasRole(roleName, tenantId)) {
          hasRequiredRole = true
          break
        }
      }

      if (!hasRequiredRole) {
        // Check for system admin override if enabled
        if (options.allowSystemAdmin && await user.hasRole('super_admin')) {
          return next()
        }

        return res.status(403).json({
          error: 'Insufficient role',
          required: roleNames,
          user: user._id
        })
      }

      next()
    } catch (error) {
      console.error('Role check middleware error:', error)
      res.status(500).json({ error: 'Role check failed' })
    }
  }
}

/**
 * Middleware to ensure user can only access resources within their tenant
 * (unless they are system admin)
 */
const requireTenantAccess = (req, res, next) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  const requestedTenantId = req.params.tenantId || req.body.tenantId || req.query.tenantId

  // If no specific tenant requested, allow (will be filtered by tenant field)
  if (!requestedTenantId) {
    return next()
  }

  // Allow if user belongs to the requested tenant
  if (user.tenant.toString() === requestedTenantId.toString()) {
    return next()
  }

  // Allow system admins to access any tenant
  if (user.roles && user.roles.includes('super_admin')) {
    return next()
  }

  // Allow tenant admins to access their tenant
  if (user.roles && user.roles.includes('tenant_admin') && user.tenant.toString() === requestedTenantId.toString()) {
    return next()
  }

  return res.status(403).json({
    error: 'Access denied: tenant access not allowed',
    userTenant: user.tenant,
    requestedTenant: requestedTenantId
  })
}

module.exports = {
  requirePermission,
  requireRole,
  requireTenantAccess
}