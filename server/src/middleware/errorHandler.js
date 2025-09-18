import { ZodError } from "zod";

export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  const error = {
    type: err.type || "about:blank",
    title: err.title || err.message,
    status: err.status || 500,
    detail: err.message,
  };

  if (err instanceof ZodError) {
    error.status = 400;
    error.title = "Validation Error";
    error.detail = err.issues.map((issue) => issue.message).join("; ");
  }

  if (err.instance) {
    error.instance = err.instance;
  }

  res.status(error.status).type("application/problem+json").json(error);
}
