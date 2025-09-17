import { Router } from "express";
import { stationController } from "../controllers/index.js";

const stationRouter = Router();

stationRouter.post("/", stationController.createStation);
stationRouter.get("/", stationController.getAllStations);
stationRouter.get("/:stationId", stationController.getStationById);
stationRouter.patch("/:stationId", stationController.updateStation);
stationRouter.delete("/:stationId", stationController.deleteStation);

export default stationRouter;