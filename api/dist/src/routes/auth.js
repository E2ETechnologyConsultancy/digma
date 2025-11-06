"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// Public routes (no authentication required)
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
// Protected routes (authentication required)
router.get('/profile', auth_1.authenticate, authController_1.getProfile);
router.post('/change-password', auth_1.authenticate, authController_1.changePassword);
router.post('/logout', auth_1.authenticate, authController_1.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map