'use strict';

import BaseError from '~/system/base-error';

export default class InternalServerError extends BaseError {

  /**
   * Create a InternalServerError response
   *
   * @returns {Object} error
   */
  constructor() {
    super('InternalServerError', 500, 'An internal server error occured');
  }

}
