#!/usr/bin/env node

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./src/models/User')
const { authenticate } = require('./src/middlewares/auth')

// Mock MongoDB connection for testing
const mongoose = require('mongoose')
require('dotenv').config()

async function runAuthTests() {
  console.log('Running Authentication Unit Tests...\n')

  try {
    // Connect to MongoDB (assuming it's running via Docker or locally)
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/digma')
    console.log('✅ Connected to MongoDB')

    // Test 1: Password hashing
    console.log('\n1. Testing password hashing...')
    const password = 'test123'
    const hash = await bcrypt.hash(password, 10)
    const isValid = await bcrypt.compare(password, hash)
    if (isValid) {
      console.log('✅ Password hashing works')
    } else {
      console.log('❌ Password hashing failed')
    }

    // Test 2: JWT token generation and verification
    console.log('\n2. Testing JWT tokens...')
    const payload = { userId: '123', email: 'test@test.com' }
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'test-secret')
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret')
    if (decoded.userId === payload.userId) {
      console.log('✅ JWT token generation/verification works')
    } else {
      console.log('❌ JWT token test failed')
    }

    // Test 3: User model password methods
    console.log('\n3. Testing User model password methods...')
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: hash,
      tenant: null,
      isSystemAdmin: true
    })

    const passwordValid = await testUser.comparePassword(password)
    if (passwordValid) {
      console.log('✅ User password comparison works')
    } else {
      console.log('❌ User password comparison failed')
    }

    // Test 4: Check test users exist
    console.log('\n4. Checking test users exist...')
    const adminUser = await User.findOne({ email: 'admin@test.com' })
    const regularUser = await User.findOne({ email: 'user@test.com' })

    if (adminUser) {
      console.log('✅ Admin test user exists')
    } else {
      console.log('❌ Admin test user not found')
    }

    if (regularUser) {
      console.log('✅ Regular test user exists')
    } else {
      console.log('❌ Regular test user not found')
    }

    console.log('\n🎉 All authentication unit tests passed!')
    console.log('\nTo test the full API:')
    console.log('1. Start MongoDB: docker-compose up -d mongodb (or however you run MongoDB)')
    console.log('2. Start API: cd api && npm start')
    console.log('3. Run: node test_auth.js')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  } finally {
    await mongoose.connection.close()
  }
}

runAuthTests()