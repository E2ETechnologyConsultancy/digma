import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
declare global {
    namespace Express {
        interface Request {
            user?: IUser & {
                roles?: string[];
            };
        }
    }
}
/**
 * Generate JWT token for user
 * @param user - User object
 * @returns JWT token
 */
export declare const generateToken: (user: IUser) => string;
/**
 * Authentication middleware - verifies JWT token
 */
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Optional authentication middleware - doesn't fail if no token
 */
export declare const optionalAuthenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Admin-only middleware - requires super_admin role
 */
export declare const requireAdmin: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Tenant admin middleware - requires tenant_admin or super_admin role
 */
export declare const requireTenantAdmin: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map