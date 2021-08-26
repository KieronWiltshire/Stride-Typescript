'use strict';

import Config from '~/config';
import { MongoClient } from 'mongodb';
import InternalServerError from "~/http/errors/internal-server-error";

/**
 * Connection options
 */
export const options = {
  host: Config.get('database.host', '127.0.0.1'),
  port: Config.get('database.port', '3306'),
  user: Config.get('database.username', 'root'),
  password: Config.get('database.password', ''),
  db: Config.get('database.database', 'sntl'),
};

let connectionURL = null;

if (options.user && options.password) {
  connectionURL = (options.user + ':' + options.password);
}

if (options.host) {
  if (connectionURL) {
    connectionURL += '@' + options.host;
  } else {
    connectionURL = options.host;
  }
} else {
  throw new InternalServerError().push({
    code: 'no_database_host_specified',
    message: 'You must specify a host in order to establish a database connection'
  });
}

if (options.port) {
  connectionURL += ':' + options.port;
}

if (options.db) {
  connectionURL += '/' + options.db;
}

/**
 * Create a mongo client.
 */
export const client = new MongoClient('mongodb://' + connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/**
 * Export mongo client.
 */
export default client;
