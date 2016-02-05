'use strict';

import os from 'os';
import Promise from 'bluebird';
import pgpModule from 'pg-promise';

import Joi from 'joi';
import Boom from 'boom';

import config from './config';

const pg = pgpModule({
  promiseLib: Promise,
});

let db = null;
config.database.then((details) => {
  db = pg(details);
  db.connect().catch((error) => {
    console.log('Failed to connect to database:', error);
    process.exit();
  });
});

const routes = {};

routes.index = (request, reply) => {
  reply(`Hello from ${os.hostname()}!`);
};

routes.getTests = (request, reply) => {
  db.any(`
    SELECT id, data FROM tests;
  `)
    .then((data) => {
      reply(data);
    })
    .catch((error) => {
      reply(Boom.badImplementation('Database query went boom', error));
    });
};

routes.getTest = (request, reply) => {
  db.oneOrNone(`
    SELECT id, data FROM tests WHERE id = $1;
  `, [
    request.params.id,
  ])
    .then((data) => {
      if (!data) reply(Boom.notFound('test not found'));
      reply(data);
    })
    .catch((error) => {
      reply(Boom.badImplementation('Database query went boom', error));
    });
};

routes.createTest = (request, reply) => {
  db.one(`
    INSERT INTO tests (data) VALUES ($1)
    RETURNING id;
  `, [
    request.payload.data,
  ])
    .then((data) => {
      reply(data).created(`/test/${data.id}`);
    })
    .catch((error) => {
      reply(Boom.badImplementation('Database query went boom', error));
    });
};

module.exports = [{
  method: 'GET',
  path: '/',
  handler: routes.index,
}, {
  method: 'GET',
  path: '/tests',
  handler: routes.getTests,
}, {
  method: 'GET',
  path: '/tests/{id}',
  config: {
    validate: {
      params: {
        id: Joi.number().integer().positive(),
      },
    },

    handler: routes.getTest,
  },
}, {
  method: 'POST',
  path: '/tests',
  config: {
    validate: {
      payload: {
        data: Joi.string().required().min(3),
      },
    },

    handler: routes.createTest,
  },
}];
