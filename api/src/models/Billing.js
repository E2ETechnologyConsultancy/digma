const { mongoose } = require('../mongo')

const SubscriptionSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  plan: {
    name: { type: String, required: true },
    tier: { type: String, enum: ['starter', 'professional', 'enterprise'], required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' }
  },
  status: {
    type: String,
    enum: ['active', 'past_due', 'canceled', 'unpaid', 'trialing'],
    default: 'trialing'
  },
  stripeSubscriptionId: { type: String },
  currentPeriodStart: { type: Date },
  currentPeriodEnd: { type: Date },
  trialEnd: { type: Date },
  cancelAtPeriodEnd: { type: Boolean, default: false },
  features: {
    maxCampaigns: { type: Number, default: 5 },
    maxUsers: { type: Number, default: 3 },
    aiOptimization: { type: Boolean, default: false },
    advancedReporting: { type: Boolean, default: false },
    prioritySupport: { type: Boolean, default: false },
    customIntegrations: { type: Boolean, default: false }
  },
  usage: {
    campaignsCreated: { type: Number, default: 0 },
    apiCalls: { type: Number, default: 0 },
    storageUsed: { type: Number, default: 0 } // in MB
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const InvoiceSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
  stripeInvoiceId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: {
    type: String,
    enum: ['draft', 'open', 'paid', 'void', 'uncollectible'],
    default: 'draft'
  },
  billingPeriod: {
    start: { type: Date },
    end: { type: Date }
  },
  items: [{
    description: { type: String },
    amount: { type: Number },
    quantity: { type: Number, default: 1 }
  }],
  taxAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paidAt: { type: Date },
  dueDate: { type: Date },
  pdfUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const PaymentMethodSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  stripePaymentMethodId: { type: String, required: true },
  type: { type: String, enum: ['card', 'bank_account'], required: true },
  card: {
    brand: { type: String },
    last4: { type: String },
    expMonth: { type: Number },
    expYear: { type: Number }
  },
  bankAccount: {
    bankName: { type: String },
    last4: { type: String },
    routingNumber: { type: String }
  },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Update timestamps
SubscriptionSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

InvoiceSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

PaymentMethodSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Indexes
SubscriptionSchema.index({ tenant: 1, status: 1 })
SubscriptionSchema.index({ stripeSubscriptionId: 1 }, { unique: true, sparse: true })

InvoiceSchema.index({ tenant: 1, status: 1 })
InvoiceSchema.index({ stripeInvoiceId: 1 }, { unique: true, sparse: true })

PaymentMethodSchema.index({ tenant: 1, isDefault: 1 })

module.exports = {
  Subscription: mongoose.model('Subscription', SubscriptionSchema),
  Invoice: mongoose.model('Invoice', InvoiceSchema),
  PaymentMethod: mongoose.model('PaymentMethod', PaymentMethodSchema)
}