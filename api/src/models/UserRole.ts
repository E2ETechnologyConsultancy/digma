import mongoose, { Document, Schema, Model } from 'mongoose'

// Interface for the UserRole document
export interface IUserRole extends Document {
  user: mongoose.Types.ObjectId
  role: mongoose.Types.ObjectId
  tenant?: mongoose.Types.ObjectId
  assignedBy: mongoose.Types.ObjectId
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Interface for the UserRole model
export interface IUserRoleModel extends Model<IUserRole> {
  // Add static methods here if needed
}

const UserRoleSchema = new Schema<IUserRole, IUserRoleModel>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }, // Optional for system-wide roles
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Indexes
UserRoleSchema.index({ user: 1, role: 1, tenant: 1 }, { unique: true })
UserRoleSchema.index({ user: 1, isActive: 1 })

// Update the updatedAt field before saving
UserRoleSchema.pre<IUserRole>('save', function(next) {
  this.updatedAt = new Date()
  next()
})

const UserRole = mongoose.model<IUserRole, IUserRoleModel>('UserRole', UserRoleSchema)

export default UserRole