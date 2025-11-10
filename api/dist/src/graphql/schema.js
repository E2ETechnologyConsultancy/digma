"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    health: String
  }

  type Mutation {
    ping: String
  }
`;
exports.resolvers = {
    Query: {
        health: () => 'GraphQL API is healthy',
    },
    Mutation: {
        ping: () => 'pong',
    },
};
//# sourceMappingURL=schema.js.map