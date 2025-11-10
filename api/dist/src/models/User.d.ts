import mongoose, { Document, Model } from 'mongoose';
export interface IUser extends Document {
    tenant?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    isActive: boolean;
    isSystemAdmin: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    userRoles: any[];
    setPassword(password: string): Promise<void>;
    checkPassword(password: string): Promise<boolean>;
    updateLastLogin(): Promise<IUser>;
    getRoles(): Promise<string[]>;
    hasPermission(resource: string, action: string, tenantId?: string | null): Promise<boolean>;
    hasRole(roleName: string, tenantId?: string | null): Promise<boolean>;
    getPermissions(tenantId?: string | null): Promise<string[]>;
}
export interface IUserModel extends Model<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
    createUser(userData: Partial<IUser & {
        password: string;
    }>): Promise<IUser>;
}
declare const User: IUserModel;
export default User;
//# sourceMappingURL=User.d.ts.map