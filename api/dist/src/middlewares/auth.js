"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireTenantAdmin = exports.requireAdmin = exports.optionalAuthenticate = exports.authenticate = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
/**
 * Generate JWT token for user
 * @param user - User object
 * @returns JWT token
 */
const generateToken = (user) => {
    const payload = {
        userId: user._id,
        email: user.email,
        tenant: user.tenant,
        roles: [] // We'll populate this later from database
    };
    const options = { expiresIn: '24h' };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
};
exports.generateToken = generateToken;
/**
 * Authentication middleware - verifies JWT token
 */
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Access token required' });
            return;
        }
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Get user from database
        const user = await User_1.default.findById(decoded.userId)
            .populate('tenant', 'name');
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        // Attach user to request object
        req.user = user;
        req.user.roles = decoded.roles || [];
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Token expired' });
            return;
        }
        else if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        console.error('Authentication error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
};
exports.authenticate = authenticate;
/**
 * Optional authentication middleware - doesn't fail if no token
 */
const optionalAuthenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            req.user = undefined;
            next();
            return;
        }
        const token = authHeader.substring(7);
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await User_1.default.findById(decoded.userId)
            .populate('tenant', 'name');
        if (user) {
            req.user = user;
            req.user.roles = decoded.roles || [];
        }
        else {
            req.user = undefined;
        }
        next();
    }
    catch (error) {
        // For optional auth, just set user to null and continue
        req.user = undefined;
        next();
    }
};
exports.optionalAuthenticate = optionalAuthenticate;
/**
 * Admin-only middleware - requires super_admin role
 */
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }
    if (!req.user.roles?.includes('super_admin')) {
        res.status(403).json({ error: 'Admin access required' });
        return;
    }
    next();
};
exports.requireAdmin = requireAdmin;
/**
 * Tenant admin middleware - requires tenant_admin or super_admin role
 */
const requireTenantAdmin = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }
    if (!req.user.roles?.includes('super_admin') && !req.user.roles?.includes('tenant_admin')) {
        res.status(403).json({ error: 'Tenant admin access required' });
        return;
    }
    next();
};
exports.requireTenantAdmin = requireTenantAdmin;
//# sourceMappingURL=auth.js.map