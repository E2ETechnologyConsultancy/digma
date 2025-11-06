"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    tenant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: function () { return !this.isSystemAdmin; }
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isSystemAdmin: { type: Boolean, default: false },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ tenant: 1, email: 1 });
// Update the updatedAt field before saving
UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
// Virtual for user's roles
UserSchema.virtual('userRoles', {
    ref: 'UserRole',
    localField: '_id',
    foreignField: 'user'
});
// Instance methods
UserSchema.methods.setPassword = async function (password) {
    const saltRounds = 12;
    this.passwordHash = await bcryptjs_1.default.hash(password, saltRounds);
};
UserSchema.methods.checkPassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.passwordHash);
};
UserSchema.methods.updateLastLogin = function () {
    this.lastLogin = new Date();
    return this.save();
};
UserSchema.methods.getRoles = async function () {
    const UserRole = mongoose_1.default.model('UserRole');
    const userRoles = await UserRole.find({
        user: this._id,
        isActive: true
    }).populate('role', 'name');
    return userRoles.map((ur) => ur.role.name);
};
UserSchema.methods.hasPermission = async function (resource, action, tenantId = null) {
    const UserRole = mongoose_1.default.model('UserRole');
    const RolePermission = mongoose_1.default.model('RolePermission');
    const Permission = mongoose_1.default.model('Permission');
    // Find user's active roles
    const userRoles = await UserRole.find({
        user: this._id,
        isActive: true,
        $or: [
            { tenant: tenantId },
            { tenant: null }
        ]
    }).populate('role');
    if (userRoles.length === 0)
        return false;
    // Check if any role has the required permission
    for (const userRole of userRoles) {
        const permission = await Permission.findOne({ resource, action });
        if (!permission)
            continue;
        const rolePermission = await RolePermission.findOne({
            role: userRole.role._id,
            permission: permission._id
        });
        if (rolePermission)
            return true;
    }
    return false;
};
UserSchema.methods.hasRole = async function (roleName, tenantId = null) {
    const UserRole = mongoose_1.default.model('UserRole');
    const Role = mongoose_1.default.model('Role');
    const role = await Role.findOne({ name: roleName });
    if (!role)
        return false;
    const userRole = await UserRole.findOne({
        user: this._id,
        role: role._id,
        isActive: true,
        $or: [
            { tenant: tenantId },
            { tenant: null }
        ]
    });
    return !!userRole;
};
UserSchema.methods.getPermissions = async function (tenantId = null) {
    const UserRole = mongoose_1.default.model('UserRole');
    const RolePermission = mongoose_1.default.model('RolePermission');
    const Permission = mongoose_1.default.model('Permission');
    const userRoles = await UserRole.find({
        user: this._id,
        isActive: true,
        $or: [
            { tenant: tenantId },
            { tenant: null }
        ]
    }).populate('role');
    const permissions = new Set();
    for (const userRole of userRoles) {
        const rolePermissions = await RolePermission.find({ role: userRole.role._id })
            .populate('permission');
        rolePermissions.forEach((rp) => {
            permissions.add(`${rp.permission.resource}:${rp.permission.action}`);
        });
    }
    return Array.from(permissions);
};
// Static methods
UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email.toLowerCase() });
};
UserSchema.statics.createUser = async function (userData) {
    const user = new this(userData);
    if (userData.password) {
        await user.setPassword(userData.password);
    }
    return user.save();
};
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map