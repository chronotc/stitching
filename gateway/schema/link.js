const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  extend type User {
    courses: [Course]
  }
`;

const resolvers = mergeInfo => ({
  User: {
    courses: {
      fragment: `fragment UserFragment on User { id }`,
      resolve(parent, args, context, info) {
        const userId = parent.id;
        return mergeInfo.delegate(
          'query',
          'courses',
          {
            userId,
          },
          context,
          info,
        );
      },
    }
  }
});

module.exports = {
  typeDefs,
  resolvers
};