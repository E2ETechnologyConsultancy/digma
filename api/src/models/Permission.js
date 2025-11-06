const { mongoose } = require('../mongo')

const PermissionSchema = new mongoose.Schema({
  resource: { type: String, required: true }, // e.g., 'tenant', 'user', 'metric'
  action: { type: String, required: true }, // e.g., 'create', 'read', 'update', 'delete'
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

// Compound index to ensure unique resource-action combinations
PermissionSchema.index({ resource: 1, action: 1 }, { unique: true })

module.exports = mongoose.model('Permission', PermissionSchema)