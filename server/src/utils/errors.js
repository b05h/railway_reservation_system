export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
export const asyncErrorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
