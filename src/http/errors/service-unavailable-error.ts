'use strict';

import BaseError from '~/system/base-error';

export default class ServiceUnavailableError extends BaseError {

  /**
   * Create a NotFoundError response
   *
   * @returns {Object} error
   */
  constructor() {
    super('ServiceUnavailableError', 503, 'The service is temporarily unavailable');
  }

}
