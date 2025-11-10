"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = start;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./graphql/schema");
const mongo_1 = require("./mongo");
// Import routes
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const campaigns_1 = __importDefault(require("./routes/campaigns"));
const billing_1 = __importDefault(require("./routes/billing"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DigMa Advertising Platform API',
            version: '1.0.0',
            description: 'API for managing advertising campaigns with multi-tenant RBAC',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Paths to files containing OpenAPI definitions
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Health check endpoint
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: API is healthy
 */
app.get('/health', (req, res) => res.json({ status: 'ok' }));
// Debug endpoint to check MongoDB connection
/**
 * @swagger
 * /debug:
 *   get:
 *     summary: Debug endpoint to check database connection
 *     security: []
 *     responses:
 *       200:
 *         description: Database connection status and counts
 *       500:
 *         description: Database connection error
 */
app.get('/debug', async (req, res) => {
    try {
        const tenants = await mongo_1.mongoose.model('Tenant').find();
        const users = await mongo_1.mongoose.model('User').find();
        const metrics = await mongo_1.mongoose.model('Metric').find();
        const campaigns = await mongo_1.mongoose.model('Campaign').find();
        res.json({
            mongoConnected: mongo_1.mongoose.connection.readyState === 1,
            counts: {
                tenants: tenants.length,
                users: users.length,
                metrics: metrics.length,
                campaigns: campaigns.length
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// API Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/campaigns', campaigns_1.default);
app.use('/api/billing', billing_1.default);
async function start() {
    try {
        console.log('Connecting to MongoDB...');
        await (0, mongo_1.connect)();
        console.log('MongoDB connected successfully');
        console.log('Starting Apollo Server...');
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: schema_1.resolvers,
            formatError: (err) => {
                console.error('GraphQL Error:', err);
                return err;
            }
        });
        await server.start();
        console.log('Apollo Server started');
        server.applyMiddleware({ app: app, path: '/graphql' });
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`API listening on ${PORT}, GraphQL at /graphql, Swagger at /api-docs`));
    }
    catch (err) {
        console.error('Failed to start API', err);
        process.exit(1);
    }
}
// Only start the server if this file is run directly
if (require.main === module) {
    start();
}
exports.default = app;
//# sourceMappingURL=app.js.map