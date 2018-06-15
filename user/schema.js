const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  # the schema allows the following query:
  type Query {
    subscriptions: [UserSubscriptions]
    users: [User]
    user(userId: String): User
  }

  # this schema allows the following mutation:
  type Mutation {
    updateSub(type: String): UpdateSubResponse
  }

  type UpdateSubResponse {
    message: String
    user: User
    courseId: String
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

const users = [
  {
    id: '3',
    name: 'Bob',
    subscription: {
      id: 111,
      label: 'theSub'
    }
  },
  {
    id: '6',
    name: 'Bob',
    subscription: {
      id: 111,
      label: 'theSub'
    }
  }
];

const resolvers = {
  Query: {
    subscriptions: () => [{
      id: 2,
      label: 'theSub'
    }],
    users: () => users,
    user: (obj, args) => users.find(user => user.id === args.userId)
  },
  Mutation: {
    updateSub: () => ({
      message: 'hello world',
      user: users.find(user => user.id === '6'),
      courseId: 'course3'
    })
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});