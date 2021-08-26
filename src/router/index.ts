'use strict';

import * as Fs from 'fs';
import * as Path from 'path';
import * as Cors from 'cors';
import * as Helmet from 'helmet';
import * as Logger from 'morgan';
import * as Express from 'express';
import APIRouter from '~/router/api';
import * as BodyParser from 'body-parser';
import {publicDir} from '~/app';
import * as CookieParser from 'cookie-parser';
import * as MethodOverride from 'method-override';
import Config from '~/config';
import Database from '~/database';
import InternalServerError from "~/http/errors/internal-server-error";
import NotFoundError from "~/http/errors/not-found-error";

const InvalidRouteCode = {
  code: 'invalid_route',
  message: 'The server could not process the request.'
};

/**
 * Initialize the router.
 */
const Router = Express.Router();

/**
 * Global Middleware
 */
if (process.env.NODE_ENV !== 'testing') {
  Router.use(Logger('dev'));
}

// let faviconPath = Path.join(publicDir, 'favicon.ico');
// if (Fs.existsSync(faviconPath)) {
//   Application.use(favicon(faviconPath));
// }

Router.use(BodyParser.json());
Router.use(BodyParser.urlencoded({ 'extended': true }));
Router.use(CookieParser(Config.get('app.key', null), {
  'httpOnly': true,
  'secure': Config.get('app.secure', false)
}));
Router.use(Helmet());
Router.use(MethodOverride('X-HTTP-Method-Override'));
Router.use(Cors());

/**
 * Configure non-api endpoints
 */
Router.use('/public', Express.static(publicDir));

/**
 * Ensure that the database is connected before
 * allowing the request to continue through it's
 * lifecycle.
 */
Router.use(function databaseCheck(_request, _response, next) {
  if (Database.isConnected()) {
    next();
  } else {
    throw new InternalServerError().push({
      code: 'no_database_connection_established',
      message: 'A database connection needs to be established'
    });
  }
});

// Apply router if after the middleware has been applied
Router.use('/api', APIRouter);

/**
 * Redirect other calls to the application router, if a route cannot be found
 * or the error isn't handled, then we fallback to the public directory thus
 * leaving the client to deal with it.
 */
Router.use(function serveFrontend(request, response, next) {
  if (request.originalUrl.startsWith('/api')) {
    next((new NotFoundError()).push(InvalidRouteCode));
  } else {
    const indexFile = Path.join(publicDir, 'index.html');

    if (Fs.existsSync(indexFile)) {
      response.sendFile(indexFile);
    } else {
      next();
    }
  }
}, Express.static(publicDir));

// Apply 404 catch
Router.use(function notFoundCatch(_request, _response, next) {
  next(new NotFoundError().push(InvalidRouteCode)); // Resource not found
});

export default Router;
