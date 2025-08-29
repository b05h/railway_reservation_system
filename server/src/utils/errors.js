export class AppError extends Error {
  constructor(
    status = 500,
    message,
    title = message,
    instance,
    type = "about:blank",
  ) {
    super(message);
    this.status = status;
    this.type = type;
    this.title = title;
    this.instance = instance;
    Error.captureStackTrace(this, this.constructor);
  }
}
export const asyncErrorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
