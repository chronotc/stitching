const { mergeSchemas } = require('graphql-tools');
const local = require('./local');
const getUserSchema = require('./user');

module.exports = () => Promise.all([
  getUserSchema()
])
.then(([user]) => {
  return mergeSchemas({
    schemas: [local, user],
  });
});

