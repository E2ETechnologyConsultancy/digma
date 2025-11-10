import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    health: String
  }

  type Mutation {
    ping: String
  }
`

export const resolvers = {
  Query: {
    health: () => 'GraphQL API is healthy',
  },
  Mutation: {
    ping: () => 'pong',
  },
}