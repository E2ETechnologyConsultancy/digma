import { Document, Model } from 'mongoose';
export interface IRole extends Document {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IRoleModel extends Model<IRole> {
}
declare const Role: IRoleModel;
export default Role;
//# sourceMappingURL=Role.d.ts.map