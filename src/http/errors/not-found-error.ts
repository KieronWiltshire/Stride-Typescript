import BaseError from '~/system/base-error';

export default class NotFoundError extends BaseError {

  /**
   * Create a NotFoundError response
   *
   * @returns {Object} error
   */
  constructor() {
    super('NotFoundError', 404, 'The intended resource could not be found');
  }

}
