const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  # the schema allows the following query:
  type Query {
    subscriptions: [UserSubscriptions]
    users: [User]
  }

  # this schema allows the following mutation:
  type Mutation {
    updateSub(type: String): UpdateSubResponse
  }

  type UpdateSubResponse {
    message: String
  }

  type UserSubscriptions {
    id: Int
    label: String
  }

  type User {
    id: ID
    name: String
    subscription: UserSubscriptions
  }
`;

const resolvers = {
  Query: {
    subscriptions: () => [{
      id: 2,
      label: 'theSub'
    }],
    users: () => [{
      id: 123,
      name: 'Bob',
      subscription: {
        id: 111,
        label: 'theSub'
      }
    }]
  },
  Mutation: {
    updateSub: () => ({ message: 'hello world' })
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});