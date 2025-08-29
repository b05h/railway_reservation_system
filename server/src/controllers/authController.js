import bcrypt from "bcrypt";
import { asyncErrorHandler } from "../utils/errors.js";
import User from "../models/userModel.js";
import { AppError } from "../utils/errors.js";
import { getToken } from "../utils/jwt.js";
import * as z from "zod";

const signUp = asyncErrorHandler(async (req, res, next) => {
  0;
  // validate request body
  const schema = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(8),
  });
  const { name, email, password } = await schema.parseAsync(req.body);

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create(name, email, hashedPassword);

  res.success({ user }, { status: 201 });
});

const signIn = asyncErrorHandler(async (req, res, next) => {
  const schema = z.object({
    email: z.email(),
    password: z.string(),
  });

  const { email, password } = await schema.parseAsync(req.body);

  // find user by email and throw error if not found
  const user = await User.findByEmail(email);
  if (!user) {
    throw new AppError(404, "Invalid email or password");
  }

  // check password and throw error if invalid
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new AppError(401, "Invalid email or password");
  }

  // generate token
  const token = getToken(user);
  res.success({ token });
});

export default {
  signUp,
  signIn,
};
