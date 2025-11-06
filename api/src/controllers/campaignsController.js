const Campaign = require('../models/Campaign')

async function listCampaigns(req, res) {
  try {
    const tenantId = req.params.tenantId || req.query.tenantId || req.user.tenant
    const { status, platform, limit = 50, offset = 0 } = req.query

    let query = { tenant: tenantId }

    // Apply filters
    if (status) query.status = status
    if (platform) query.platform = platform

    // If user is not system admin, only show their campaigns
    if (!req.user.roles?.includes('super_admin') && !req.user.roles?.includes('tenant_admin')) {
      query.createdBy = req.user._id
    }

    const campaigns = await Campaign.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))

    const total = await Campaign.countDocuments(query)

    res.json({
      campaigns,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + campaigns.length < total
      }
    })
  } catch (err) {
    console.error('Error listing campaigns:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function createCampaign(req, res) {
  try {
    const tenantId = req.params.tenantId || req.body.tenantId || req.user.tenant
    const campaignData = { ...req.body, tenant: tenantId, createdBy: req.user._id }

    // Validate required fields
    const requiredFields = ['name', 'platform', 'objective', 'budget']
    for (const field of requiredFields) {
      if (!campaignData[field]) {
        return res.status(400).json({ error: `${field} is required` })
      }
    }

    // Check campaign limits based on subscription
    const campaignCount = await Campaign.countDocuments({ tenant: tenantId, status: { $ne: 'cancelled' } })
    // TODO: Check subscription limits here

    const campaign = new Campaign(campaignData)
    await campaign.save()

    await campaign.populate('createdBy', 'name email')

    res.status(201).json(campaign)
  } catch (err) {
    console.error('Error creating campaign:', err)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    }
    res.status(500).json({ error: 'Database error' })
  }
}

async function getCampaign(req, res) {
  try {
    const { id } = req.params

    const campaign = await Campaign.findById(id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('tenant', 'name')

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' })
    }

    // Check access permissions
    if (!req.user.roles?.includes('super_admin') &&
        campaign.tenant.toString() !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    res.json(campaign)
  } catch (err) {
    console.error('Error getting campaign:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function updateCampaign(req, res) {
  try {
    const { id } = req.params
    const updates = req.body

    const campaign = await Campaign.findById(id)
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' })
    }

    // Check access permissions
    if (!req.user.roles?.includes('super_admin') &&
        campaign.tenant.toString() !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    // Update campaign
    Object.assign(campaign, updates, { updatedBy: req.user._id })
    await campaign.save()

    await campaign.populate('createdBy', 'name email')
    await campaign.populate('updatedBy', 'name email')

    res.json(campaign)
  } catch (err) {
    console.error('Error updating campaign:', err)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    }
    res.status(500).json({ error: 'Database error' })
  }
}

async function deleteCampaign(req, res) {
  try {
    const { id } = req.params

    const campaign = await Campaign.findById(id)
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' })
    }

    // Check access permissions
    if (!req.user.roles?.includes('super_admin') &&
        campaign.tenant.toString() !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    // Soft delete by setting status to cancelled
    campaign.status = 'cancelled'
    campaign.updatedBy = req.user._id
    await campaign.save()

    res.status(204).end()
  } catch (err) {
    console.error('Error deleting campaign:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function updateCampaignPerformance(req, res) {
  try {
    const { id } = req.params
    const performanceData = req.body

    const campaign = await Campaign.findById(id)
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' })
    }

    // Update performance metrics
    Object.assign(campaign.performance, performanceData)
    campaign.calculateMetrics() // Recalculate derived metrics
    campaign.updatedBy = req.user._id
    await campaign.save()

    res.json(campaign.performance)
  } catch (err) {
    console.error('Error updating campaign performance:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

async function duplicateCampaign(req, res) {
  try {
    const { id } = req.params

    const originalCampaign = await Campaign.findById(id)
    if (!originalCampaign) {
      return res.status(404).json({ error: 'Campaign not found' })
    }

    // Check access permissions
    if (!req.user.roles?.includes('super_admin') &&
        originalCampaign.tenant.toString() !== req.user.tenant.toString()) {
      return res.status(403).json({ error: 'Access denied' })
    }

    // Create duplicate
    const duplicateData = {
      ...originalCampaign.toObject(),
      _id: undefined,
      name: `${originalCampaign.name} (Copy)`,
      status: 'draft',
      performance: {}, // Reset performance metrics
      externalIds: {}, // Reset external IDs
      createdBy: req.user._id,
      updatedBy: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }

    const duplicate = new Campaign(duplicateData)
    await duplicate.save()

    await duplicate.populate('createdBy', 'name email')

    res.status(201).json(duplicate)
  } catch (err) {
    console.error('Error duplicating campaign:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

module.exports = {
  listCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  deleteCampaign,
  updateCampaignPerformance,
  duplicateCampaign
}