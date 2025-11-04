const fs = require('fs')
const path = require('path')

async function runMigrations(direction = 'up') {
  console.log(`Running migrations [${direction}]...`)
  
  // Get all migration files
  const files = fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.js') && f !== 'migrate.js')
    .sort()

  if (direction === 'down') {
    files.reverse()
  }

  // Run each migration in sequence
  for (const file of files) {
    console.log(`\nExecuting migration: ${file}`)
    const migration = require(path.join(__dirname, file))
    await migration[direction]()
  }

  console.log('\nAll migrations complete!')
  process.exit(0)
}

// Run migrations if called directly
if (require.main === module) {
  const direction = process.argv[2] || 'up'
  if (!['up', 'down'].includes(direction)) {
    console.log('Usage: node migrate.js [up|down]')
    process.exit(1)
  }
  runMigrations(direction).catch(err => {
    console.error('Migration failed:', err)
    process.exit(1)
  })
}