const { mongoose } = require('../mongo')

const CampaignSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'cancelled'],
    default: 'draft'
  },
  platform: {
    type: String,
    enum: ['facebook', 'instagram', 'google', 'tiktok', 'linkedin', 'spotify', 'whatsapp'],
    required: true
  },
  objective: {
    type: String,
    enum: ['awareness', 'traffic', 'engagement', 'leads', 'sales', 'app_installs'],
    required: true
  },
  budget: {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    dailyLimit: { type: Number },
    lifetimeLimit: { type: Number }
  },
  targeting: {
    age: {
      min: { type: Number, min: 13, max: 65 },
      max: { type: Number, min: 13, max: 65 }
    },
    gender: [{ type: String, enum: ['male', 'female', 'all'] }],
    locations: [{ type: String }],
    interests: [{ type: String }],
    languages: [{ type: String }],
    customAudiences: [{ type: mongoose.Schema.Types.ObjectId }]
  },
  creative: {
    headline: { type: String },
    description: { type: String },
    callToAction: { type: String },
    mediaUrls: [{ type: String }],
    adFormat: { type: String, enum: ['single_image', 'carousel', 'video', 'story', 'reel'] }
  },
  schedule: {
    startDate: { type: Date },
    endDate: { type: Date },
    timezone: { type: String, default: 'UTC' }
  },
  aiOptimization: {
    enabled: { type: Boolean, default: false },
    budgetOptimization: { type: Boolean, default: false },
    contentGeneration: { type: Boolean, default: false },
    abTesting: { type: Boolean, default: false }
  },
  performance: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    spend: { type: Number, default: 0 },
    ctr: { type: Number, default: 0 },
    cpc: { type: Number, default: 0 },
    cpa: { type: Number, default: 0 },
    roas: { type: Number, default: 0 }
  },
  externalIds: {
    platformCampaignId: { type: String },
    platformAdSetId: { type: String },
    platformAdId: { type: String }
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Indexes for performance
CampaignSchema.index({ tenant: 1, status: 1 })
CampaignSchema.index({ tenant: 1, platform: 1 })
CampaignSchema.index({ tenant: 1, createdAt: -1 })
CampaignSchema.index({ 'externalIds.platformCampaignId': 1 })

// Update the updatedAt field before saving
CampaignSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Calculate derived metrics
CampaignSchema.methods.calculateMetrics = function() {
  if (this.performance.impressions > 0) {
    this.performance.ctr = (this.performance.clicks / this.performance.impressions) * 100
  }
  if (this.performance.clicks > 0) {
    this.performance.cpc = this.performance.spend / this.performance.clicks
  }
  if (this.performance.conversions > 0) {
    this.performance.cpa = this.performance.spend / this.performance.conversions
  }
  if (this.performance.spend > 0) {
    this.performance.roas = (this.performance.conversions * this.creative.expectedValue || 0) / this.performance.spend
  }
}

module.exports = mongoose.model('Campaign', CampaignSchema)