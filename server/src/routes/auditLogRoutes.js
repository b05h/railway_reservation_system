import { Router } from "express";
import { auditLogController } from "../controllers/index.js";

const auditLogRouter = Router();

auditLogRouter.get("/", auditLogController.get);
auditLogRouter.get("/:id", auditLogController.getById);

export default auditLogRouter;
