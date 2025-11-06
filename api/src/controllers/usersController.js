const User = require('../models/User')
const Tenant = require('../models/Tenant')

async function listUsers(req, res) {
  try {
    const tenantId = req.params.tenantId || req.query.tenantId

    let query = {}
    if (tenantId) {
      query.tenant = tenantId
    }

    // If user is not system admin, only show users from their tenant
    if (!req.user.roles?.includes('super_admin')) {
      query.tenant = req.user.tenant
    }

    const users = await User.find(query)
      .populate('tenant', 'name')
      .select('-passwordHash') // Don't return password hashes

    res.json(users)
  } catch (err) {
    console.error('Error listing users:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function createUser(req, res) {
  try {
    const { name, email, tenantId } = req.body

    if (!name) {
      return res.status(400).json({ error: 'name is required' })
    }

    // Determine tenant for the new user
    let userTenantId = tenantId

    // If no tenant specified and user is not system admin, use their own tenant
    if (!userTenantId && !req.user.roles?.includes('super_admin')) {
      userTenantId = req.user.tenant
    }

    // If still no tenant and user is not system admin, deny
    if (!userTenantId && !req.user.roles?.includes('super_admin')) {
      return res.status(400).json({ error: 'tenantId is required' })
    }

    // Verify tenant exists
    if (userTenantId) {
      const tenant = await Tenant.findById(userTenantId)
      if (!tenant) {
        return res.status(400).json({ error: 'Invalid tenant' })
      }
    }

    // Check for duplicate email within tenant
    if (email) {
      const existingUser = await User.findOne({ email, tenant: userTenantId })
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists for this tenant' })
      }
    }

    const user = new User({
      name,
      email,
      tenant: userTenantId,
      passwordHash: req.body.passwordHash || null // In production, this should be properly hashed
    })

    await user.save()

    // Populate tenant info for response
    await user.populate('tenant', 'name')

    res.status(201).json({
      ...user.toObject(),
      passwordHash: undefined // Don't return password hash
    })
  } catch (err) {
    console.error('Error creating user:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params

    const user = await User.findById(id)
      .populate('tenant', 'name')
      .select('-passwordHash')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if user can access this user's data
    if (!req.user.roles?.includes('super_admin') && user.tenant.toString() !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    res.json(user)
  } catch (err) {
    console.error('Error getting user:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params
    const updates = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if user can update this user
    if (!req.user.roles?.includes('super_admin') && user.tenant.toString() !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    // Prevent non-system-admins from changing tenant
    if (updates.tenant && !req.user.roles?.includes('super_admin')) {
      return res.status(403).json({ error: 'Cannot change user tenant' })
    }

    // Update user
    Object.assign(user, updates)
    await user.save()

    await user.populate('tenant', 'name')

    res.json({
      ...user.toObject(),
      passwordHash: undefined
    })
  } catch (err) {
    console.error('Error updating user:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if user can delete this user
    if (!req.user.roles?.includes('super_admin') && user.tenant.toString() !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    // Prevent deleting self
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot delete yourself' })
    }

    await User.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting user:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

module.exports = { listUsers, createUser, getUser, updateUser, deleteUser }
