'use strict';

import Hapi from 'hapi';
import Good from 'good'; // logging
import GoodConsole from 'good-console'; // logging console plugin
import Routes from './routes';

import config from './config';

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: config.server.host,
  port: config.server.port,
});

server.route(Routes);

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: GoodConsole,
      events: {
        response: '*',
        log: '*',
      },
    }],
  },
}, (err) => {
  if (err) throw err;
  server.start(() => {
    server.log('info', `Server running at: ${server.info.uri}`);
  });
});
