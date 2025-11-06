"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// All campaign routes require authentication
router.use(auth_1.authenticate);
// Placeholder routes - will be implemented with proper controllers
router.get('/', (req, res) => {
    res.json({ message: 'List campaigns endpoint' });
});
router.get('/:id', (req, res) => {
    res.json({ message: `Get campaign ${req.params.id} endpoint` });
});
router.post('/', (req, res) => {
    res.json({ message: 'Create campaign endpoint' });
});
router.put('/:id', (req, res) => {
    res.json({ message: `Update campaign ${req.params.id} endpoint` });
});
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete campaign ${req.params.id} endpoint` });
});
exports.default = router;
//# sourceMappingURL=campaigns.js.map