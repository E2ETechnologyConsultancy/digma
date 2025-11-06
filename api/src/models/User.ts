import mongoose, { Document, Schema, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

// Interface for the User document
export interface IUser extends Document {
  tenant?: mongoose.Types.ObjectId
  name: string
  email: string
  passwordHash: string
  isActive: boolean
  isSystemAdmin: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date

  // Virtuals
  userRoles: any[]

  // Instance methods
  setPassword(password: string): Promise<void>
  checkPassword(password: string): Promise<boolean>
  updateLastLogin(): Promise<IUser>
  getRoles(): Promise<string[]>
  hasPermission(resource: string, action: string, tenantId?: string | null): Promise<boolean>
  hasRole(roleName: string, tenantId?: string | null): Promise<boolean>
  getPermissions(tenantId?: string | null): Promise<string[]>
}

// Interface for the User model (static methods)
export interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>
  createUser(userData: Partial<IUser & { password: string }>): Promise<IUser>
}

const UserSchema = new Schema<IUser, IUserModel>({
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: function(this: IUser) { return !this.isSystemAdmin }
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isSystemAdmin: { type: Boolean, default: false },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Indexes
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ tenant: 1, email: 1 })

// Update the updatedAt field before saving
UserSchema.pre<IUser>('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Virtual for user's roles
UserSchema.virtual('userRoles', {
  ref: 'UserRole',
  localField: '_id',
  foreignField: 'user'
})

// Instance methods
UserSchema.methods.setPassword = async function(password: string): Promise<void> {
  const saltRounds = 12
  this.passwordHash = await bcrypt.hash(password, saltRounds)
}

UserSchema.methods.checkPassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.passwordHash)
}

UserSchema.methods.updateLastLogin = function(): Promise<IUser> {
  this.lastLogin = new Date()
  return this.save()
}

UserSchema.methods.getRoles = async function(): Promise<string[]> {
  const UserRole = mongoose.model('UserRole')
  const userRoles = await UserRole.find({
    user: this._id,
    isActive: true
  }).populate('role', 'name')

  return userRoles.map((ur: any) => ur.role.name)
}

UserSchema.methods.hasPermission = async function(
  resource: string,
  action: string,
  tenantId: string | null = null
): Promise<boolean> {
  const UserRole = mongoose.model('UserRole')
  const RolePermission = mongoose.model('RolePermission')
  const Permission = mongoose.model('Permission')

  // Find user's active roles
  const userRoles = await UserRole.find({
    user: this._id,
    isActive: true,
    $or: [
      { tenant: tenantId },
      { tenant: null }
    ]
  }).populate('role')

  if (userRoles.length === 0) return false

  // Check if any role has the required permission
  for (const userRole of userRoles) {
    const permission = await Permission.findOne({ resource, action })
    if (!permission) continue

    const rolePermission = await RolePermission.findOne({
      role: (userRole as any).role._id,
      permission: permission._id
    })

    if (rolePermission) return true
  }

  return false
}

UserSchema.methods.hasRole = async function(
  roleName: string,
  tenantId: string | null = null
): Promise<boolean> {
  const UserRole = mongoose.model('UserRole')
  const Role = mongoose.model('Role')

  const role = await Role.findOne({ name: roleName })
  if (!role) return false

  const userRole = await UserRole.findOne({
    user: this._id,
    role: role._id,
    isActive: true,
    $or: [
      { tenant: tenantId },
      { tenant: null }
    ]
  })

  return !!userRole
}

UserSchema.methods.getPermissions = async function(tenantId: string | null = null): Promise<string[]> {
  const UserRole = mongoose.model('UserRole')
  const RolePermission = mongoose.model('RolePermission')
  const Permission = mongoose.model('Permission')

  const userRoles = await UserRole.find({
    user: this._id,
    isActive: true,
    $or: [
      { tenant: tenantId },
      { tenant: null }
    ]
  }).populate('role')

  const permissions = new Set<string>()

  for (const userRole of userRoles) {
    const rolePermissions = await RolePermission.find({ role: (userRole as any).role._id })
      .populate('permission')

    rolePermissions.forEach((rp: any) => {
      permissions.add(`${rp.permission.resource}:${rp.permission.action}`)
    })
  }

  return Array.from(permissions)
}

// Static methods
UserSchema.statics.findByEmail = function(email: string): Promise<IUser | null> {
  return this.findOne({ email: email.toLowerCase() })
}

UserSchema.statics.createUser = async function(
  userData: Partial<IUser & { password: string }>
): Promise<IUser> {
  const user = new this(userData)
  if (userData.password) {
    await user.setPassword(userData.password)
  }
  return user.save()
}

const User = mongoose.model<IUser, IUserModel>('User', UserSchema)

export default User