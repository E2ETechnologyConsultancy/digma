const { mongoose } = require('../mongo')

const MetricSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  source: { type: String },
  payload: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Metric', MetricSchema)
