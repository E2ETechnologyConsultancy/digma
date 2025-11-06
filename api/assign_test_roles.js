#!/usr/bin/env node

const { connect } = require('./src/mongo')
const User = require('./src/models/User')
const Role = require('./src/models/Role')
const UserRole = require('./src/models/UserRole')

async function assignTestUserRoles() {
  console.log('Assigning roles to test users...')
  await connect()

  // Get roles
  const tenantAdminRole = await Role.findOne({ name: 'tenant_admin' })
  const tenantUserRole = await Role.findOne({ name: 'tenant_user' })

  if (!tenantAdminRole || !tenantUserRole) {
    console.log('Roles not found. Please run RBAC migration first.')
    process.exit(1)
  }

  // Get test users
  const adminUser = await User.findOne({ email: 'admin@test.com' })
  const regularUser = await User.findOne({ email: 'user@test.com' })

  if (adminUser) {
    // Check if admin role already assigned
    let existing = await UserRole.findOne({ user: adminUser._id, role: tenantAdminRole._id })
    if (!existing) {
      await UserRole.create({
        user: adminUser._id,
        role: tenantAdminRole._id,
        tenant: adminUser.tenant,
        assignedBy: adminUser._id
      })
      console.log('Assigned tenant_admin role to admin@test.com')
    }
  }

  if (regularUser) {
    // Check if user role already assigned
    let existing = await UserRole.findOne({ user: regularUser._id, role: tenantUserRole._id })
    if (!existing) {
      await UserRole.create({
        user: regularUser._id,
        role: tenantUserRole._id,
        tenant: regularUser.tenant,
        assignedBy: adminUser ? adminUser._id : regularUser._id
      })
      console.log('Assigned tenant_user role to user@test.com')
    }
  }

  console.log('Test user roles assigned successfully!')
  process.exit(0)
}

assignTestUserRoles().catch(console.error)