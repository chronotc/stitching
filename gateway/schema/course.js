const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { introspectSchema, makeRemoteExecutableSchema } = require('graphql-tools');

const link = new HttpLink({ uri: 'http://localhost:5000/graphql', fetch });

module.exports = () => introspectSchema(link)
  .then(schema => makeRemoteExecutableSchema({ schema, link }));