import { Router } from "express";
import { auditController } from "../controllers/index.js";

const auditRouter = Router();

auditRouter.get("/audits", auditController.filterAudits);

export default auditRouter;
