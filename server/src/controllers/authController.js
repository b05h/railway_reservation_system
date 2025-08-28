import bcrypt from "bcrypt";
import { asyncErrorHandler } from "../utils/errors.js";
import User from "../models/userModel.js";
import { getToken } from "../utils/jwt.js";

const signUp = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create(name, email, hashedPassword);
  res.status(201).json(user);
});

const signIn = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = getToken(user);
  res.status(200).json({ token });
});

export default {
  signUp,
  signIn,
};
