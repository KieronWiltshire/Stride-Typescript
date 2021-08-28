import BaseError from '~/system/base-error';

export default class UnauthorizedError extends BaseError {

  /**
   * Create a UnauthorizedError response
   *
   * @returns {Object} error
   */
  constructor() {
    super('UnauthorizedError', 401, 'You are unauthorized to make that request');
  }

}
