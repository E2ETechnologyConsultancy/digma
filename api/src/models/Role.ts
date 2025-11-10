import mongoose, { Document, Schema, Model } from 'mongoose'

// Interface for the Role document
export interface IRole extends Document {
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

// Interface for the Role model
export interface IRoleModel extends Model<IRole> {
  // Add static methods here if needed
}

const RoleSchema = new Schema<IRole, IRoleModel>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Update the updatedAt field before saving
RoleSchema.pre<IRole>('save', function(next) {
  this.updatedAt = new Date()
  next()
})

const Role = mongoose.model<IRole, IRoleModel>('Role', RoleSchema)

export default Role