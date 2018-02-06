const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  # the schema allows the following query:
  type Query {
    tokens: [Token]
  }

  type Token {
    jwt: String
    expiresAt: String
  }
`;

const resolvers = {
  Query: {
    tokens: () => [{
      jwt: 'JWWWWT',
      expiresAt: 'today'
    }],
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});