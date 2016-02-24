// Configs

import consulModule from 'consul';
const consul = consulModule({
  host: '172.17.0.1',
  promisify: true,
});

/* eslint-disable max-len */

const config = {
  development: {},
  production: {},
};

// Development config
config.development.server = {
  host: '0.0.0.0',
  port: 8000,
};

config.development.database = new Promise((resolve) => resolve({
  host: 'database',
  port: 5432,
  database: 'testify',
  user: 'testify',
  password: 'testify',
}));

// Production config
config.production.server = {
  host: '0.0.0.0',
  port: 8000,
};

config.production.database = consul.catalog.service.nodes('testify-database')
  .then((nodes) => {
    if (!nodes.length) throw new Error('No database nodes available');
    const node = nodes[0];
    return {
      host: node.Address,
      port: node.ServicePort,
      database: 'testify',
      user: 'testify',
      password: 'testify',
    };
  })
  .catch((error) => {
    throw error;
  });

// Output configuration
/* eslint-enable max-len */

export default config[process.env.NODE_ENV];
