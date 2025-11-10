const { mongoose } = require('../mongo')

const RolePermissionSchema = new mongoose.Schema({
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  permission: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true },
  createdAt: { type: Date, default: Date.now },
})

// Compound index to ensure unique role-permission combinations
RolePermissionSchema.index({ role: 1, permission: 1 }, { unique: true })

module.exports = mongoose.model('RolePermission', RolePermissionSchema)