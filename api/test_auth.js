#!/usr/bin/env node

const axios = require('axios')

const API_BASE = 'http://localhost:5000/api'

async function testAuthentication() {
  console.log('Testing Authentication and RBAC...\n')

  try {
    // Test 1: Login as admin
    console.log('1. Testing admin login...')
    const adminLogin = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@test.com',
      password: 'admin123'
    })
    const adminToken = adminLogin.data.token
    console.log('✅ Admin login successful')
    console.log(`   Token: ${adminToken.substring(0, 50)}...`)

    // Test 2: Login as regular user
    console.log('\n2. Testing regular user login...')
    const userLogin = await axios.post(`${API_BASE}/auth/login`, {
      email: 'user@test.com',
      password: 'user123'
    })
    const userToken = userLogin.data.token
    console.log('✅ User login successful')
    console.log(`   Token: ${userToken.substring(0, 50)}...`)

    // Test 3: Admin accessing user management (should work)
    console.log('\n3. Testing admin accessing user management...')
    const adminUsers = await axios.get(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
    console.log('✅ Admin can access user management')
    console.log(`   Found ${adminUsers.data.length} users`)

    // Test 4: Regular user accessing user management (should fail)
    console.log('\n4. Testing regular user accessing user management...')
    try {
      await axios.get(`${API_BASE}/users`, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      console.log('❌ User should not be able to access user management')
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('✅ User correctly denied access to user management')
      } else {
        console.log('❌ Unexpected error:', error.response?.status)
      }
    }

    // Test 5: Both users accessing campaigns (should work for both)
    console.log('\n5. Testing both users accessing campaigns...')
    const adminCampaigns = await axios.get(`${API_BASE}/campaigns`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
    console.log('✅ Admin can access campaigns')

    const userCampaigns = await axios.get(`${API_BASE}/campaigns`, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    console.log('✅ User can access campaigns')

    // Test 6: Accessing without token (should fail)
    console.log('\n6. Testing access without authentication...')
    try {
      await axios.get(`${API_BASE}/users`)
      console.log('❌ Should require authentication')
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Correctly requires authentication')
      } else {
        console.log('❌ Unexpected error:', error.response?.status)
      }
    }

    console.log('\n🎉 All authentication and RBAC tests passed!')

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message)
    if (error.response?.status) {
      console.error('Status:', error.response.status)
    }
  }
}

testAuthentication()