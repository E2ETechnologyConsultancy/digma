#!/usr/bin/env node

const { connect } = require('./src/mongo')
const User = require('./src/models/User')
const Tenant = require('./src/models/Tenant')
const bcrypt = require('bcryptjs')

async function createTestUsers() {
  console.log('Creating test users...')
  await connect()

  // Get existing tenants
  const tenants = await Tenant.find({})
  if (tenants.length === 0) {
    console.log('No tenants found. Please run the initial migration first.')
    process.exit(1)
  }

  const tenant1 = tenants[0]

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  let adminUser = await User.findOne({ email: 'admin@test.com' })
  if (!adminUser) {
    adminUser = await User.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      passwordHash: adminPassword,
      tenant: tenant1._id,
      isActive: true
    })
    console.log('Created admin user: admin@test.com / admin123')
  }

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10)
  let regularUser = await User.findOne({ email: 'user@test.com' })
  if (!regularUser) {
    regularUser = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      passwordHash: userPassword,
      tenant: tenant1._id,
      isActive: true
    })
    console.log('Created regular user: user@test.com / user123')
  }

  console.log('Test users created successfully!')
  process.exit(0)
}

createTestUsers().catch(console.error)