import BaseError from '~/system/base-error';

export default class ForbiddenError extends BaseError {

  /**
   * Create a ForbiddenError response
   *
   * @returns {Object} error
   */
  constructor() {
    super('ForbiddenError', 403, 'You are forbidden to make that request');
  }

}
