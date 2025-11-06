import mongoose, { Document, Schema, Model } from 'mongoose'

// Interface for the Tenant document
export interface ITenant extends Document {
  name: string
  meta?: {
    description?: string
    [key: string]: any
  }
  createdAt: Date
  updatedAt: Date
}

// Interface for the Tenant model
export interface ITenantModel extends Model<ITenant> {
  // Add static methods here if needed
}

const TenantSchema = new Schema<ITenant, ITenantModel>({
  name: { type: String, required: true, unique: true },
  meta: {
    description: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Update the updatedAt field before saving
TenantSchema.pre<ITenant>('save', function(next) {
  this.updatedAt = new Date()
  next()
})

const Tenant = mongoose.model<ITenant, ITenantModel>('Tenant', TenantSchema)

export default Tenant