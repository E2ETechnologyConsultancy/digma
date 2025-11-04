const { gql } = require('apollo-server-express')
const Metric = require('../models/Metric')
const GraphQLJSON = require('graphql-type-json')

// GraphQL schema focused on metrics only. Tenant/user management remains in the database
// but is not exposed via this public GraphQL API surface. This schema supports queries
// for metrics and a mutation to ingest metrics. Filtering and aggregation can be added.

const typeDefs = gql`
  scalar JSON

  type Metric { id: ID!, tenant: ID!, source: String, payload: JSON, createdAt: String }

  type Query {
    # fetch raw metrics for a tenant. Filters: source, since, until, limit
    metrics(tenantId: ID!, source: String, since: String, until: String, limit: Int): [Metric]
  }

  type Mutation {
    # ingest a single metric (used by background jobs)
    addMetric(tenantId: ID!, source: String, payload: JSON): Metric
    # ingest many metrics in a batch
    addMetricsBatch(tenantId: ID!, source: String, payloads: [JSON]!): [Metric]
  }
`

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    metrics: async (_, { tenantId, source, since, until, limit = 100 }) => {
      console.log('Query metrics:', { tenantId, source, since, until, limit })
      const q = { tenant: tenantId }
      if (source) q.source = source
      if (since || until) q.createdAt = {}
      if (since) q.createdAt.$gte = new Date(since)
      if (until) q.createdAt.$lte = new Date(until)
      console.log('MongoDB query:', JSON.stringify(q))
      const docs = await Metric.find(q).sort({ createdAt: -1 }).limit(limit).lean()
      console.log('Found metrics:', docs.length)
      return docs.map((d) => ({ id: d._id.toString(), tenant: d.tenant.toString(), source: d.source, payload: d.payload, createdAt: d.createdAt }))
    },
  },
  Mutation: {
    addMetric: async (_, { tenantId, source, payload }) => {
      const m = new Metric({ tenant: tenantId, source, payload })
      return m.save()
    },
    addMetricsBatch: async (_, { tenantId, source, payloads }) => {
      const docs = payloads.map((p) => ({ tenant: tenantId, source, payload: p }))
      const inserted = await Metric.insertMany(docs)
      return inserted.map((d) => ({ id: d._id.toString(), tenant: d.tenant.toString(), source: d.source, payload: d.payload, createdAt: d.createdAt }))
    },
  },
}

module.exports = { typeDefs, resolvers }
