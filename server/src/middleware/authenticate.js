import * as z from "zod";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/errors";

export default function authenticate(req, res, next) {
  // validate authorization header
  const schema = z.object({
    authorization: z.string(),
  });
  const { authorization } = schema.parse(req.headers);

  // extract token from authorization header
  const [, token] = authorization.split(" ");
  if (!token) {
    throw new AppError(401, "Token missing");
  }

  // verify token
  const userId = verifyToken(token);
  if (!userId) {
    throw new AppError(401, "Invalid token");
  }

  req.userId = userId;
  next();
}
