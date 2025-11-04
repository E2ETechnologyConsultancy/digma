const { mongoose } = require('../mongo')

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Credentials/config for third-party integrations. Store as mixed so shape can evolve.
  // IMPORTANT: these may contain secrets (api keys, refresh tokens). Limit who can query these fields.
  meta: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  google: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Tenant', TenantSchema)
