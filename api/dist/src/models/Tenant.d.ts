import { Document, Model } from 'mongoose';
export interface ITenant extends Document {
    name: string;
    meta?: {
        description?: string;
        [key: string]: any;
    };
    createdAt: Date;
    updatedAt: Date;
}
export interface ITenantModel extends Model<ITenant> {
}
declare const Tenant: ITenantModel;
export default Tenant;
//# sourceMappingURL=Tenant.d.ts.map