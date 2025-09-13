import { Router } from "express";
import stationDistanceController from "../controllers/stationDistanceController.js";

const router = Router();
router.post("/station-distances", stationDistanceController.createDistance);
router.get("/station-distances", stationDistanceController.getAllDistances);
router.get("/station-distances-between", stationDistanceController.getDistanceBetween);
router.patch("/station-distances", stationDistanceController.updateDistance);
router.delete("/station-distances", stationDistanceController.deleteDistance);

export default router;
