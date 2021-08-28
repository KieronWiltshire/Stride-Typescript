import BaseError from '~/system/base-error';

export default class BadRequestError extends BaseError {

  /**
   * Create a BadRequestError response
   *
   * @returns {Object} error
   */
  constructor() {
    super('BadRequestError', 400, 'The server could not process the request');
  }

}
