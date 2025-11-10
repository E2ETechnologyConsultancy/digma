import request from 'supertest'
import app from '../src/app'
import User from '../src/models/User'
import Tenant from '../src/models/Tenant'

describe('Authentication API', () => {

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      // Create a test tenant first
      const tenant = await Tenant.create({
        name: 'test-tenant',
        meta: { description: 'Test tenant' }
      })

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        tenantId: tenant._id
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201)

      expect(response.body).toHaveProperty('user')
      expect(response.body).toHaveProperty('token')
      expect(response.body.user.email).toBe(userData.email)
      expect(response.body.user.name).toBe(userData.name)
    })

    it('should return error for duplicate email', async () => {
      // Create a test tenant first
      const tenant = await Tenant.create({
        name: 'test-tenant-2',
        meta: { description: 'Test tenant' }
      })

      // Create first user
      await User.createUser({
        name: 'Test User',
        email: 'duplicate@example.com',
        tenant: tenant._id,
        password: 'password123'
      })

      // Try to register with same email
      const userData = {
        name: 'Test User 2',
        email: 'duplicate@example.com',
        password: 'password456',
        tenantId: tenant._id
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.error).toContain('already exists')
    })

    it('should return error for password too short', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: '123', // Too short
        tenantId: 'some-tenant-id'
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)

      expect(response.body.error).toContain('at least 6 characters')
    })
  })

  describe('POST /api/auth/login', () => {
    it('should login successfully with correct credentials', async () => {
      // Create a test tenant first
      const tenant = await Tenant.create({
        name: 'test-tenant-login',
        meta: { description: 'Test tenant for login' }
      })

      // Create a user
      await User.createUser({
        name: 'Login Test User',
        email: 'login@test.com',
        tenant: tenant._id,
        password: 'password123'
      })

      const loginData = {
        email: 'login@test.com',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200)

      expect(response.body).toHaveProperty('user')
      expect(response.body).toHaveProperty('token')
      expect(response.body.user.email).toBe(loginData.email)
      expect(response.body.message).toBe('Login successful')
    })

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'nonexistent@test.com',
        password: 'wrongpassword'
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401)

      expect(response.body.error).toBe('Invalid email or password')
    })
  })

  describe('GET /api/auth/profile', () => {
    let token: string
    let user: any

    beforeEach(async () => {
      // Create a test tenant
      const tenant = await Tenant.create({
        name: 'test-tenant-profile',
        meta: { description: 'Test tenant for profile' }
      })

      // Create and login a user
      user = await User.createUser({
        name: 'Profile Test User',
        email: 'profile@test.com',
        tenant: tenant._id,
        password: 'password123'
      })

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'profile@test.com',
          password: 'password123'
        })

      token = loginResponse.body.token
    })

    it('should return user profile when authenticated', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(response.body).toHaveProperty('user')
      expect(response.body.user.email).toBe(user.email)
      expect(response.body.user.name).toBe(user.name)
    })

    it('should return error when not authenticated', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect(401)

      expect(response.body.error).toBe('Access token required')
    })
  })
})