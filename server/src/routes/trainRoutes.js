import { Router } from "express";
import trainController from "../controllers/trainController.js";

const trainRouter = Router();

trainRouter.post("/", trainController.createTrain);
trainRouter.get("/", trainController.getAllTrains);
trainRouter.get("/:trainId", trainController.getTrainById);
trainRouter.patch("/:trainId", trainController.updateTrain);
trainRouter.delete("/:trainId", trainController.deleteTrain);

trainRouter.post("/:trainId/seat-chart", trainController.configureSeatChart);

export default trainRouter;