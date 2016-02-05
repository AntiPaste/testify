// Configs

/* eslint-disable max-len */

const config = {
  development: {},
  production: {},
};

// Development config
config.development.server = {
  host: 'localhost',
  port: 8000,
};

config.development.database = {
  host: 'database',
  port: 5432,
  database: 'testify',
  user: 'testify',
  password: 'testify',
};

// Production config
config.production.server = {
  host: '0.0.0.0',
  port: 8000,
};

config.production.database = {
  host: 'database',
  port: 5432,
  database: 'testify',
  user: 'testify',
  password: 'testify',
};

// Output configuration
/* eslint-enable max-len */

export default config[process.env.NODE_ENV];
