const { mongoose } = require('../mongo')

const UserRoleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }, // Optional - null for system-wide roles
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who assigned this role
  assignedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }, // Optional expiration date
  isActive: { type: Boolean, default: true },
})

// Compound index to ensure unique user-role-tenant combinations
UserRoleSchema.index({ user: 1, role: 1, tenant: 1 }, { unique: true, sparse: true })

// Index for efficient queries
UserRoleSchema.index({ user: 1, isActive: 1 })
UserRoleSchema.index({ tenant: 1, isActive: 1 })

module.exports = mongoose.model('UserRole', UserRoleSchema)