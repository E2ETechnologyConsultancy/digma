const { Subscription, Invoice, PaymentMethod } = require('../models/Billing')
const Tenant = require('../models/Tenant')

// Subscription management
async function getSubscription(req, res) {
  try {
    const tenantId = req.params.tenantId || req.user.tenant

    // Check access permissions
    if (!req.user.roles?.includes('super_admin') && tenantId !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    const subscription = await Subscription.findOne({ tenant: tenantId })
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' })
    }

    res.json(subscription)
  } catch (err) {
    console.error('Error getting subscription:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function createSubscription(req, res) {
  try {
    const tenantId = req.params.tenantId || req.body.tenantId || req.user.tenant
    const subscriptionData = { ...req.body, tenant: tenantId }

    // Validate required fields
    const requiredFields = ['plan']
    for (const field of requiredFields) {
      if (!subscriptionData[field]) {
        return res.status(400).json({ error: `${field} is required` })
      }
    }

    // Check if subscription already exists
    const existing = await Subscription.findOne({ tenant: tenantId })
    if (existing) {
      return res.status(400).json({ error: 'Subscription already exists for this tenant' })
    }

    const subscription = new Subscription(subscriptionData)
    await subscription.save()

    res.status(201).json(subscription)
  } catch (err) {
    console.error('Error creating subscription:', err)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    }
    res.status(500).json({ error: 'Database error' })
  }
}

async function updateSubscription(req, res) {
  try {
    const tenantId = req.params.tenantId || req.user.tenant
    const updates = req.body

    const subscription = await Subscription.findOne({ tenant: tenantId })
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' })
    }

    // Check access permissions
    if (!req.user.roles?.includes('super_admin') && tenantId !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    Object.assign(subscription, updates)
    await subscription.save()

    res.json(subscription)
  } catch (err) {
    console.error('Error updating subscription:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

// Invoice management
async function listInvoices(req, res) {
  try {
    const tenantId = req.params.tenantId || req.user.tenant
    const { status, limit = 20, offset = 0 } = req.query

    let query = { tenant: tenantId }
    if (status) query.status = status

    // Check access permissions
    if (!req.user.roles?.includes('super_admin') && tenantId !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    const invoices = await Invoice.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))

    const total = await Invoice.countDocuments(query)

    res.json({
      invoices,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + invoices.length < total
      }
    })
  } catch (err) {
    console.error('Error listing invoices:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function getInvoice(req, res) {
  try {
    const { id } = req.params

    const invoice = await Invoice.findById(id).populate('subscription')
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' })
    }

    // Check access permissions
    if (!req.user.roles?.includes('super_admin') &&
        invoice.tenant.toString() !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    res.json(invoice)
  } catch (err) {
    console.error('Error getting invoice:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

// Payment method management
async function listPaymentMethods(req, res) {
  try {
    const tenantId = req.params.tenantId || req.user.tenant

    // Check access permissions
    if (!req.user.roles?.includes('super_admin') && tenantId !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    const paymentMethods = await PaymentMethod.find({ tenant: tenantId })
      .sort({ isDefault: -1, createdAt: -1 })

    res.json(paymentMethods)
  } catch (err) {
    console.error('Error listing payment methods:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function addPaymentMethod(req, res) {
  try {
    const tenantId = req.params.tenantId || req.user.tenant
    const paymentMethodData = { ...req.body, tenant: tenantId }

    // Validate required fields
    if (!paymentMethodData.stripePaymentMethodId || !paymentMethodData.type) {
      return res.status(400).json({ error: 'stripePaymentMethodId and type are required' })
    }

    // If this is the first payment method or marked as default, set it as default
    if (paymentMethodData.isDefault) {
      await PaymentMethod.updateMany(
        { tenant: tenantId },
        { isDefault: false }
      )
    } else {
      const existingCount = await PaymentMethod.countDocuments({ tenant: tenantId })
      if (existingCount === 0) {
        paymentMethodData.isDefault = true
      }
    }

    const paymentMethod = new PaymentMethod(paymentMethodData)
    await paymentMethod.save()

    res.status(201).json(paymentMethod)
  } catch (err) {
    console.error('Error adding payment method:', err)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    }
    res.status(500).json({ error: 'Database error' })
  }
}

async function setDefaultPaymentMethod(req, res) {
  try {
    const { id } = req.params
    const tenantId = req.user.tenant

    // Unset all default payment methods for this tenant
    await PaymentMethod.updateMany(
      { tenant: tenantId },
      { isDefault: false }
    )

    // Set the specified payment method as default
    const paymentMethod = await PaymentMethod.findOneAndUpdate(
      { _id: id, tenant: tenantId },
      { isDefault: true },
      { new: true }
    )

    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' })
    }

    res.json(paymentMethod)
  } catch (err) {
    console.error('Error setting default payment method:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function deletePaymentMethod(req, res) {
  try {
    const { id } = req.params
    const tenantId = req.user.tenant

    const paymentMethod = await PaymentMethod.findOne({ _id: id, tenant: tenantId })
    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' })
    }

    // Don't allow deleting the last payment method
    const count = await PaymentMethod.countDocuments({ tenant: tenantId })
    if (count === 1) {
      return res.status(400).json({ error: 'Cannot delete the last payment method' })
    }

    await PaymentMethod.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    console.error('Error deleting payment method:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

module.exports = {
  getSubscription,
  createSubscription,
  updateSubscription,
  listInvoices,
  getInvoice,
  listPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  deletePaymentMethod
}