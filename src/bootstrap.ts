import Router from '~/router';
import Application from '~/app';
import BaseError from "~/system/base-error";
import InternalServerError from "~/http/errors/internal-server-error";

/**
 * Apply the application router before booting the application.
 */
Application.use('/', Router);

/**
 * Apply an application error response handler
 */
Application.use(function errorHandler(error, _request, response, _next) {
  const status = error.status;

  if (!(error instanceof BaseError)) {
    error = new InternalServerError();

    error.push({
      code: 'contact_support',
      message: 'If this error persists then please contact an administrator'
    });
  }

  delete error.status;

  return response.status(status || 500).json({ error });
});

/**
 * Exports
 */
export * from './app';
export * from './socket';
