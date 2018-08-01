'use strict';

const typeDefs = `
  extend type User {
    courses: [Course]
  }

  extend type UpdateSubResponse {
    course: Course
  }
`;

const resolvers = ({
  User: {
    courses: {
      fragment: `fragment UserFragment on User { id }`,
      resolve(parent, args, context, info) {
        const userId = parent.id;
        return info.mergeInfo.delegate(
          'query',
          'courses',
          {
            userId,
          },
          context,
          info
        );
      },
    }
  },
  UpdateSubResponse: {
    course: {
      resolve(parent, args, context, info) {
        const courseId = parent.courseId;
        return info.mergeInfo.delegate(
          'query',
          'course',
          {
            courseId,
          },
          context,
          info
        );
      }
    }
  }
});

module.exports = {
  typeDefs,
  resolvers
};
