const { connect, mongoose } = require('../src/mongo')
const Role = require('../src/models/Role')
const Permission = require('../src/models/Permission')
const RolePermission = require('../src/models/RolePermission')
const UserRole = require('../src/models/UserRole')
const User = require('../src/models/User')
const Tenant = require('../src/models/Tenant')

async function up() {
  console.log('Running migration: setup RBAC system')
  await connect()

  // Define permissions
  const permissions = [
    // Tenant permissions
    { resource: 'tenant', action: 'create', description: 'Create new tenants' },
    { resource: 'tenant', action: 'read', description: 'View tenant information' },
    { resource: 'tenant', action: 'update', description: 'Update tenant settings' },
    { resource: 'tenant', action: 'delete', description: 'Delete tenants' },

    // User permissions
    { resource: 'user', action: 'create', description: 'Create new users' },
    { resource: 'user', action: 'read', description: 'View user information' },
    { resource: 'user', action: 'update', description: 'Update user information' },
    { resource: 'user', action: 'delete', description: 'Delete users' },

    // Metric permissions
    { resource: 'metric', action: 'create', description: 'Create metrics' },
    { resource: 'metric', action: 'read', description: 'View metrics' },
    { resource: 'metric', action: 'update', description: 'Update metrics' },
    { resource: 'metric', action: 'delete', description: 'Delete metrics' },

    // Role permissions
    { resource: 'role', action: 'assign', description: 'Assign roles to users' },
    { resource: 'role', action: 'read', description: 'View roles and permissions' },
    { resource: 'role', action: 'manage', description: 'Create and manage roles' },

    // System permissions
    { resource: 'system', action: 'admin', description: 'Full system administration' },
  ]

  console.log('Creating permissions...')
  const createdPermissions = []
  for (const perm of permissions) {
    let existing = await Permission.findOne({ resource: perm.resource, action: perm.action })
    if (!existing) {
      existing = await Permission.create(perm)
      console.log(`Created permission: ${perm.resource}:${perm.action}`)
    }
    createdPermissions.push(existing)
  }

  // Define roles
  const roles = [
    {
      name: 'super_admin',
      description: 'Super administrator with full system access',
      isSystemRole: true,
      permissions: ['tenant:create', 'tenant:read', 'tenant:update', 'tenant:delete',
                   'user:create', 'user:read', 'user:update', 'user:delete',
                   'metric:create', 'metric:read', 'metric:update', 'metric:delete',
                   'role:assign', 'role:read', 'role:manage', 'system:admin']
    },
    {
      name: 'tenant_admin',
      description: 'Tenant administrator with full access to their tenant',
      isSystemRole: true,
      permissions: ['tenant:read', 'tenant:update',
                   'user:create', 'user:read', 'user:update', 'user:delete',
                   'metric:create', 'metric:read', 'metric:update', 'metric:delete',
                   'role:assign', 'role:read']
    },
    {
      name: 'tenant_user',
      description: 'Regular tenant user with read-only access',
      isSystemRole: true,
      permissions: ['tenant:read', 'user:read', 'metric:read']
    }
  ]

  console.log('Creating roles and assigning permissions...')
  for (const roleData of roles) {
    let role = await Role.findOne({ name: roleData.name })
    if (!role) {
      role = await Role.create({
        name: roleData.name,
        description: roleData.description,
        isSystemRole: roleData.isSystemRole
      })
      console.log(`Created role: ${roleData.name}`)
    }

    // Assign permissions to role
    for (const permKey of roleData.permissions) {
      const [resource, action] = permKey.split(':')
      const permission = createdPermissions.find(p => p.resource === resource && p.action === action)

      if (permission) {
        let existing = await RolePermission.findOne({ role: role._id, permission: permission._id })
        if (!existing) {
          await RolePermission.create({ role: role._id, permission: permission._id })
          console.log(`Assigned ${permKey} to ${roleData.name}`)
        }
      }
    }
  }

  // Assign roles to existing users
  console.log('Assigning roles to existing users...')

  // Get all existing tenants
  const tenants = await Tenant.find({})
  const superAdminRole = await Role.findOne({ name: 'super_admin' })
  const tenantAdminRole = await Role.findOne({ name: 'tenant_admin' })
  const tenantUserRole = await Role.findOne({ name: 'tenant_user' })

  // Create a system super admin user if it doesn't exist
  let systemAdmin = await User.findOne({ email: 'system@admin.com' })
  if (!systemAdmin) {
    systemAdmin = await User.create({
      name: 'System Administrator',
      email: 'system@admin.com',
      passwordHash: '$2b$10$dummy.hash.for.system.admin', // This should be properly hashed
      tenant: null, // System-wide user
      isSystemAdmin: true
    })
    console.log('Created system admin user')
  }

  // Assign super admin role to system admin
  if (systemAdmin && superAdminRole) {
    let existing = await UserRole.findOne({ user: systemAdmin._id, role: superAdminRole._id })
    if (!existing) {
      await UserRole.create({
        user: systemAdmin._id,
        role: superAdminRole._id,
        tenant: null, // System-wide
        assignedBy: systemAdmin._id
      })
      console.log('Assigned super_admin role to system admin')
    }
  }

  // Assign roles to existing tenant users
  for (const tenant of tenants) {
    const tenantUsers = await User.find({ tenant: tenant._id })

    for (const user of tenantUsers) {
      let roleToAssign = tenantUserRole // Default to regular user

      // If user email contains 'admin', make them tenant admin
      if (user.email && user.email.includes('admin')) {
        roleToAssign = tenantAdminRole
      }

      if (roleToAssign) {
        let existing = await UserRole.findOne({
          user: user._id,
          role: roleToAssign._id,
          tenant: tenant._id
        })
        if (!existing) {
          await UserRole.create({
            user: user._id,
            role: roleToAssign._id,
            tenant: tenant._id,
            assignedBy: systemAdmin._id
          })
          console.log(`Assigned ${roleToAssign.name} role to ${user.email}`)
        }
      }
    }
  }

  await mongoose.connection.close()
  console.log('RBAC migration complete!')
}

async function down() {
  console.log('Running migration rollback: removing RBAC system')
  await connect()

  await Promise.all([
    UserRole.deleteMany({}),
    RolePermission.deleteMany({}),
    Permission.deleteMany({}),
    Role.deleteMany({ isSystemRole: false }), // Only delete non-system roles
    User.deleteMany({ email: 'system@admin.com' })
  ])

  await mongoose.connection.close()
  console.log('RBAC rollback complete!')
}

// Run migration if called directly
if (require.main === module) {
  const action = process.argv[2]
  if (action === 'up') {
    up().catch(console.error)
  } else if (action === 'down') {
    down().catch(console.error)
  } else {
    console.log('Usage: node 002_setup_rbac.js [up|down]')
    process.exit(1)
  }
}

module.exports = { up, down }