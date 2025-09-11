import { Router } from "express";
import { stationController } from "../controllers/index.js";

const stationRouter = Router();

stationRouter.post("/stations", stationController.createStation);
stationRouter.get("/stations", stationController.getAllStations);
stationRouter.get("/stations/:stationId", stationController.getStationById);
stationRouter.patch("/stations/:stationId", stationController.updateStation);
stationRouter.delete("/stations/:stationId", stationController.deleteStation);

export default stationRouter;
