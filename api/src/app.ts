import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql/schema'
import { connect, mongoose } from './mongo'

// Import routes
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import campaignRoutes from './routes/campaigns'
import billingRoutes from './routes/billing'

dotenv.config()

const app: Application = express()
app.use(cors())
app.use(express.json())

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
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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
app.get('/health', (req: Request, res: Response) => res.json({ status: 'ok' }))

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
app.get('/debug', async (req: Request, res: Response) => {
  try {
    const tenants = await mongoose.model('Tenant').find()
    const users = await mongoose.model('User').find()
    const metrics = await mongoose.model('Metric').find()
    const campaigns = await mongoose.model('Campaign').find()
    res.json({
      mongoConnected: mongoose.connection.readyState === 1,
      counts: {
        tenants: tenants.length,
        users: users.length,
        metrics: metrics.length,
        campaigns: campaigns.length
      }
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use('/api/billing', billingRoutes)

export async function start(): Promise<void> {
  try {
    console.log('Connecting to MongoDB...')
    await connect()
    console.log('MongoDB connected successfully')

    console.log('Starting Apollo Server...')
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      formatError: (err) => {
        console.error('GraphQL Error:', err)
        return err
      }
    })
    await server.start()
    console.log('Apollo Server started')

    server.applyMiddleware({ app: app as any, path: '/graphql' })
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`API listening on ${PORT}, GraphQL at /graphql, Swagger at /api-docs`))
  } catch (err) {
    console.error('Failed to start API', err)
    process.exit(1)
  }
}

// Only start the server if this file is run directly
if (require.main === module) {
  start()
}

export default app