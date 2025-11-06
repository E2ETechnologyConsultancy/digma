"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// All billing routes require authentication
router.use(auth_1.authenticate);
// Placeholder routes - will be implemented with proper controllers
router.get('/subscription', (req, res) => {
    res.json({ message: 'Get subscription endpoint' });
});
router.post('/subscription', (req, res) => {
    res.json({ message: 'Create subscription endpoint' });
});
router.get('/invoices', (req, res) => {
    res.json({ message: 'List invoices endpoint' });
});
router.get('/invoices/:id', (req, res) => {
    res.json({ message: `Get invoice ${req.params.id} endpoint` });
});
exports.default = router;
//# sourceMappingURL=billing.js.map