'use strict';

import BaseError from '~/system/base-error';

export default class ValidationError extends BaseError {

  /**
   * Create a ValidationError response
   *
   * @returns {Object} error
   */
  constructor() {
    super('ValidationError', 422, 'A validation concern exists within the request context');
  }

}
