import { Document, Model } from 'mongoose';
export interface IPermission extends Document {
    resource: string;
    action: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IPermissionModel extends Model<IPermission> {
}
declare const Permission: IPermissionModel;
export default Permission;
//# sourceMappingURL=Permission.d.ts.map