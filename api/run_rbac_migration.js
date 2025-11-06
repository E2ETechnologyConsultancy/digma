#!/usr/bin/env node

const path = require('path')
const { up, down } = require('./migrations/002_setup_rbac')

const action = process.argv[2]

if (action === 'up') {
  console.log('Running RBAC setup migration...')
  up().then(() => {
    console.log('✅ RBAC migration completed successfully!')
    process.exit(0)
  }).catch(err => {
    console.error('❌ RBAC migration failed:', err)
    process.exit(1)
  })
} else if (action === 'down') {
  console.log('Rolling back RBAC migration...')
  down().then(() => {
    console.log('✅ RBAC rollback completed successfully!')
    process.exit(0)
  }).catch(err => {
    console.error('❌ RBAC rollback failed:', err)
    process.exit(1)
  })
} else {
  console.log('Usage: node run_rbac_migration.js [up|down]')
  console.log('')
  console.log('This script sets up the Role-Based Access Control system with:')
  console.log('- Roles: super_admin, tenant_admin, tenant_user')
  console.log('- Permissions: CRUD operations on tenants, users, metrics, roles')
  console.log('- User-Role assignments for existing users')
  process.exit(1)
}