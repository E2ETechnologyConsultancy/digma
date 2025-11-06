import mongoose, { Document, Schema, Model } from 'mongoose'

// Interface for the Permission document
export interface IPermission extends Document {
  resource: string
  action: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

// Interface for the Permission model
export interface IPermissionModel extends Model<IPermission> {
  // Add static methods here if needed
}

const PermissionSchema = new Schema<IPermission, IPermissionModel>({
  resource: { type: String, required: true },
  action: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Compound index for unique resource-action pairs
PermissionSchema.index({ resource: 1, action: 1 }, { unique: true })

// Update the updatedAt field before saving
PermissionSchema.pre<IPermission>('save', function(next) {
  this.updatedAt = new Date()
  next()
})

const Permission = mongoose.model<IPermission, IPermissionModel>('Permission', PermissionSchema)

export default Permission