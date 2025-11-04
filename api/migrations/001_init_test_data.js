const { connect, mongoose } = require('../src/mongo')
const Tenant = require('../src/models/Tenant')
const User = require('../src/models/User')
const Metric = require('../src/models/Metric')

async function up() {
  console.log('Running migration: init test data')
  await connect()

  // Create test tenants (idempotent)
  const tenantNames = [
    { name: 'test-tenant-1', meta: { apiKey: 'test-key-1', webhookUrl: 'https://webhook.test/1' } },
    { name: 'test-tenant-2', meta: { apiKey: 'test-key-2', webhookUrl: 'https://webhook.test/2' } },
  ]
  const tenants = []
  for (const t of tenantNames) {
    let existing = await Tenant.findOne({ name: t.name })
    if (!existing) {
      existing = await Tenant.create(t)
      console.log('Created tenant:', t.name)
    } else {
      console.log('Tenant already exists:', t.name)
    }
    tenants.push(existing)
  }

  // Create test users for each tenant
  // Create test users (idempotent)
  const users = []
  for (const tenant of tenants) {
    const adminEmail = `admin@${tenant.name}.test`
    const userEmail = `user@${tenant.name}.test`
    let admin = await User.findOne({ email: adminEmail })
    if (!admin) {
      admin = await User.create({ tenant: tenant._id, name: `Admin ${tenant.name}`, email: adminEmail, passwordHash: 'test123' })
      console.log('Created user:', adminEmail)
    }
    users.push(admin)

    let user = await User.findOne({ email: userEmail })
    if (!user) {
      user = await User.create({ tenant: tenant._id, name: `User ${tenant.name}`, email: userEmail, passwordHash: 'test123' })
      console.log('Created user:', userEmail)
    }
    users.push(user)
  }
  console.log('Users present:', users.map(u => u.email))

  // Create test metrics for each tenant
  const now = new Date()
  // Create test metrics only if none exist for the tenant (avoid duplicates)
  let createdMetrics = 0
  for (const tenant of tenants) {
    const existingCount = await Metric.countDocuments({ tenant: tenant._id })
    if (existingCount === 0) {
      await Metric.create({ tenant: tenant._id, source: 'meta', payload: { impressions: Math.floor(Math.random() * 10000), clicks: Math.floor(Math.random() * 1000), spend: Math.floor(Math.random() * 500), timestamp: now.toISOString() } })
      await Metric.create({ tenant: tenant._id, source: 'google', payload: { views: Math.floor(Math.random() * 20000), conversions: Math.floor(Math.random() * 200), revenue: Math.floor(Math.random() * 1000), timestamp: now.toISOString() } })
      createdMetrics += 2
      console.log(`Created 2 metrics for tenant ${tenant.name}`)
    } else {
      console.log(`Metrics already exist for tenant ${tenant.name}, skipping`)
    }
  }
  console.log('Created test metrics:', createdMetrics, 'new records')

  await mongoose.connection.close()
  console.log('Migration complete!')
}

async function down() {
  console.log('Running migration rollback: removing test data')
  await connect()

  await Promise.all([
    Tenant.deleteMany({ name: { $in: ['test-tenant-1', 'test-tenant-2'] } }),
    User.deleteMany({}),
    Metric.deleteMany({})
  ])

  await mongoose.connection.close()
  console.log('Rollback complete!')
}

// Run migration if called directly
if (require.main === module) {
  const action = process.argv[2]
  if (action === 'up') {
    up().catch(console.error)
  } else if (action === 'down') {
    down().catch(console.error)
  } else {
    console.log('Usage: node 001_init_test_data.js [up|down]')
    process.exit(1)
  }
}

module.exports = { up, down }