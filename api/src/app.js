const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./graphql/schema')
const { connect } = require('./mongo')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Add debug endpoint to check MongoDB connection
app.get('/debug', async (req, res) => {
  try {
    const tenants = await mongoose.model('Tenant').find()
    const users = await mongoose.model('User').find()
    const metrics = await mongoose.model('Metric').find()
    res.json({
      mongoConnected: mongoose.connection.readyState === 1,
      counts: {
        tenants: tenants.length,
        users: users.length,
        metrics: metrics.length
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

async function start() {
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

    server.applyMiddleware({ app, path: '/graphql' })
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`API listening on ${PORT}, GraphQL at /graphql`))
  } catch (err) {
    console.error('Failed to start API', err)
    process.exit(1)
  }
}

start()

module.exports = app
