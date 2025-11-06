"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
// Import all models to ensure they are registered
require("../src/models/User");
require("../src/models/Role");
require("../src/models/Permission");
require("../src/models/UserRole");
require("../src/models/RolePermission");
require("../src/models/Tenant");
let mongoServer;
beforeAll(async () => {
    // Close any existing connections
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
    }
    // Start in-memory MongoDB instance
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    // Connect to the in-memory database
    await mongoose_1.default.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}, 30000);
afterAll(async () => {
    // Close database connection
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.connection.dropDatabase();
        await mongoose_1.default.connection.close();
    }
    // Stop the in-memory MongoDB instance
    if (mongoServer) {
        await mongoServer.stop();
    }
}, 30000);
afterEach(async () => {
    // Clear all collections after each test
    if (mongoose_1.default.connection.readyState === 1) {
        const collections = mongoose_1.default.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
});
//# sourceMappingURL=setup.js.map