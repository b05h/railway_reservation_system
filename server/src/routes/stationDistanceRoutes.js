import { Router } from "express";
import stationDistanceController from "../controllers/stationDistanceController.js";

const router = Router();

router.post("/", stationDistanceController.createDistance);
router.get("/", stationDistanceController.getDistances);
router.patch("/:id", stationDistanceController.updateDistance);
router.delete("/:id", stationDistanceController.deleteDistance);
router.get("/between", stationDistanceController.getDistanceBetween);

export default router;