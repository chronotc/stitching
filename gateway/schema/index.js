'use strict';

const { mergeSchemas, transformSchema, FilterRootFields } = require('graphql-tools');
const local = require('./local');

const getUserSchema = require('./user');
const getCourseSchema = require('./course');

const transformCourseSchema = schema => {
  const blacklistedQueries = ['courses', 'course'];

  return transformSchema(schema, [
    new FilterRootFields((operation, rootField) =>
      operation === 'Query' && !blacklistedQueries.includes(rootField)
    )
  ]);
};

const typeDefs = `
  extend type User {
    courses: [Course]
  }

  extend type UpdateSubResponse {
    course: Course
  }
`;

module.exports = () => Promise.all([
  getUserSchema(),
  getCourseSchema(),
])
.then(([user, course]) => {

  const transformedCourseSchema = transformCourseSchema(course);

  return mergeSchemas({
    schemas: [local, user, transformedCourseSchema, typeDefs],
    resolvers: {
      User: {
        courses: {
          fragment: `fragment UserFragment on User { id }`,
          resolve(parent, args, context, info) {
            console.log(parent);
            const userId = parent.id;

            return info.mergeInfo.delegateToSchema({
              schema: course,
              operation: 'query',
              fieldName: 'courses',
              args: {
                userId,
              },
              context,
              info
            });
          },
        }
      },
      UpdateSubResponse: {
        course: {
          resolve(parent, args, context, info) {
            const courseId = parent.courseId;
            return info.mergeInfo.delegateToSchema({
              operation: 'query',
              fieldName: 'course',
              args: {
                courseId,
              },
              context,
              info
            });
          }
        }
      }
    }
  });
});

