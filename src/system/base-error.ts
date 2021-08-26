'use strict';

export default abstract class BaseError extends Error {

  type: string;

  status: string|number;

  message: string;

  context: Array<unknown>;

  /**
   * Create a base error
   *
   * @returns {Object} error
   */
  protected constructor(type: string, status: string|number, message: string) {
    super(message);
    this.type = type || 'BaseError';
    this.status = status || 0;
    this.message = super.message;
    this.context = [];
  }

  /**
   * Add some context to the error.
   *
   * @param meta
   */
  push(meta: unknown): BaseError {
    if (meta) {
      this.context.push(meta);
    }
    return this;
  }

}
