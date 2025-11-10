import express, { Router } from 'express'
import { authenticate } from '../middlewares/auth'

const router: Router = express.Router()

// All billing routes require authentication
router.use(authenticate)

// Placeholder routes - will be implemented with proper controllers
router.get('/subscription', (req, res) => {
  res.json({ message: 'Get subscription endpoint' })
})

router.post('/subscription', (req, res) => {
  res.json({ message: 'Create subscription endpoint' })
})

router.get('/invoices', (req, res) => {
  res.json({ message: 'List invoices endpoint' })
})

router.get('/invoices/:id', (req, res) => {
  res.json({ message: `Get invoice ${req.params.id} endpoint` })
})

export default router