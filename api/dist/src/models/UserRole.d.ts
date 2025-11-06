import mongoose, { Document, Model } from 'mongoose';
export interface IUserRole extends Document {
    user: mongoose.Types.ObjectId;
    role: mongoose.Types.ObjectId;
    tenant?: mongoose.Types.ObjectId;
    assignedBy: mongoose.Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUserRoleModel extends Model<IUserRole> {
}
declare const UserRole: IUserRoleModel;
export default UserRole;
//# sourceMappingURL=UserRole.d.ts.map