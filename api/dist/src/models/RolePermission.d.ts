import mongoose, { Document, Model } from 'mongoose';
export interface IRolePermission extends Document {
    role: mongoose.Types.ObjectId;
    permission: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export interface IRolePermissionModel extends Model<IRolePermission> {
}
declare const RolePermission: IRolePermissionModel;
export default RolePermission;
//# sourceMappingURL=RolePermission.d.ts.map