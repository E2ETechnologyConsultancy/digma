import express, { Router } from 'express'
import {
  register,
  login,
  getProfile,
  changePassword,
  logout
} from '../controllers/authController'
import { authenticate } from '../middlewares/auth'

const router: Router = express.Router()

// Public routes (no authentication required)
router.post('/register', register)
router.post('/login', login)

// Protected routes (authentication required)
router.get('/profile', authenticate, getProfile)
router.post('/change-password', authenticate, changePassword)
router.post('/logout', authenticate, logout)

export default router