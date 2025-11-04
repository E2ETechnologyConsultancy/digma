// Simple seed script to create a default tenant
const { connect } = require('../src/mongo')
const Tenant = require('../src/models/Tenant')

async function seed() {
  await connect()
  const existing = await Tenant.findOne({ name: 'default' })
  if (!existing) {
    await Tenant.create({ name: 'default' })
    console.log('Created default tenant')
  } else {
    console.log('Default tenant already exists')
  }
  process.exit(0)
}

seed().catch((e) => { console.error(e); process.exit(1) })
