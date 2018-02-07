const { mergeSchemas } = require('graphql-tools');
const local = require('./local');
const link = require('./link');

const getUserSchema = require('./user');
const getCourseSchema = require('./course');

module.exports = () => Promise.all([
  getUserSchema(),
  getCourseSchema()
])
.then(([user, course]) => {
  return mergeSchemas({
    schemas: [local, user, course, link.typeDefs],
    resolvers: link.resolvers
  });
});

