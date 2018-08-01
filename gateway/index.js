'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const resolveSchema = require('./schema');
const PORT = 3000;

const app = express();

// bodyParser is needed just for POST.
resolveSchema()
  .then(schema => app.use('/graphql', bodyParser.json(), graphqlExpress({ schema })));

app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(PORT, () => console.log(`Gateway running on ${PORT}`));
