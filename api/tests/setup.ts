import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

// Import all models to ensure they are registered
import '../src/models/User'
import '../src/models/Role'
import '../src/models/Permission'
import '../src/models/UserRole'
import '../src/models/RolePermission'
import '../src/models/Tenant'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  // Close any existing connections
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }

  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  // Connect to the in-memory database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any)
}, 30000)

afterAll(async () => {
  // Close database connection
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  }

  // Stop the in-memory MongoDB instance
  if (mongoServer) {
    await mongoServer.stop()
  }
}, 30000)

afterEach(async () => {
  // Clear all collections after each test
  if (mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany({})
    }
  }
})