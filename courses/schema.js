const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  # the schema allows the following query:
  type Query {
    courses(userId: Int): [Course]
  }

  type Course {
    id: ID
    userId: ID
    name: String
  }
`;

const resolvers = {
  Query: {
    courses: (obj, args, context, info) => {
      if (args.userId === 3) {
        return [{
          id: 'THIS',
          userId: 'FREAKEN',
          name: 'WORKS'
        }];
      }

      return [];
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});