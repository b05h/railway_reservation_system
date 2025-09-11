import { Router } from "express";
import { trainController } from "../controllers/index.js";

const trainRouter = Router();
trainRouter.post("/trains", trainController.createTrain);
trainRouter.get("/trains", trainController.getAllTrains);
trainRouter.get("/trains/:trainId", trainController.getTrainById);
trainRouter.patch("/trains/:trainId", trainController.updateTrain);
trainRouter.delete("/trains/:trainId", trainController.deleteTrain);

export default trainRouter;
