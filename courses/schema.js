const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  # the schema allows the following query:
  type Query {
    courses(userId: String): [Course]
    course(courseId: String): Course
  }

  type Course {
    id: ID
    userId: ID
    name: String
  }
`;

const courses = [
  {
    id: 'course1',
    userId: '3',
    name: 'course 1'
  },
  {
    id: 'course2',
    userId: '6',
    name: 'course 2'
  },
  {
    id: 'course3',
    userId: '6',
    name: 'course 3'
  }
]

const resolvers = {
  Query: {
    courses: (obj, args, context, info) => {
      return courses.filter(course => course.userId === args.userId)
    },
    course: (obj, args) => courses.find(course => course.id === args.courseId)
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});