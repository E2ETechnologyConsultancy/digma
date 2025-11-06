import express, { Router } from 'express'
import { authenticate } from '../middlewares/auth'

const router: Router = express.Router()

// All campaign routes require authentication
router.use(authenticate)

// Placeholder routes - will be implemented with proper controllers
router.get('/', (req, res) => {
  res.json({ message: 'List campaigns endpoint' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `Get campaign ${req.params.id} endpoint` })
})

router.post('/', (req, res) => {
  res.json({ message: 'Create campaign endpoint' })
})

router.put('/:id', (req, res) => {
  res.json({ message: `Update campaign ${req.params.id} endpoint` })
})

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete campaign ${req.params.id} endpoint` })
})

export default router