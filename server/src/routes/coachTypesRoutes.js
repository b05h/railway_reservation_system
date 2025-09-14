import { Router } from "express";
import { coachTypeController } from "../controllers/index.js";

const coachTypeRouter = Router();

coachTypeRouter.get("/", coachTypeController.get);
coachTypeRouter.get("/:id", coachTypeController.getById);
coachTypeRouter.post("/", coachTypeController.create);
coachTypeRouter.patch("/:id", coachTypeController.update);
coachTypeRouter.delete("/:id", coachTypeController.remove);

export default coachTypeRouter;
