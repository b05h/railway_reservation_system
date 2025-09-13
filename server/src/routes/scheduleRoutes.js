import { Router } from "express";
import { scheduleController } from "../controllers/index.js";

const scheduleRouter = Router();

scheduleRouter.get("/", scheduleController.get);
scheduleRouter.get("/:id", scheduleController.getById);
scheduleRouter.post("/", scheduleController.create);
scheduleRouter.put("/:id", scheduleController.update);
scheduleRouter.delete("/:id", scheduleController.remove);

export default scheduleRouter;
