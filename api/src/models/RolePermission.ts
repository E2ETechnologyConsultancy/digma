import mongoose, { Document, Schema, Model } from 'mongoose'

// Interface for the RolePermission document
export interface IRolePermission extends Document {
  role: mongoose.Types.ObjectId
  permission: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

// Interface for the RolePermission model
export interface IRolePermissionModel extends Model<IRolePermission> {
  // Add static methods here if needed
}

const RolePermissionSchema = new Schema<IRolePermission, IRolePermissionModel>({
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  permission: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Compound index for unique role-permission pairs
RolePermissionSchema.index({ role: 1, permission: 1 }, { unique: true })

// Update the updatedAt field before saving
RolePermissionSchema.pre<IRolePermission>('save', function(next) {
  this.updatedAt = new Date()
  next()
})

const RolePermission = mongoose.model<IRolePermission, IRolePermissionModel>('RolePermission', RolePermissionSchema)

export default RolePermission