import { Router } from "express";
import { authController } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);

export default authRouter;
