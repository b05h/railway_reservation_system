import express from "express";
import authenticate from "../middleware/authenticate.js";
import * as profileController from "../controllers/profileController.js";

const router = express.Router();


// ------------------- Profile Routes -------------------

router.get("/profile", authenticate, profileController.getProfile);

router.patch("/profile", authenticate, profileController.updateProfile);

// ------------------- Passenger Routes -------------------

router.get("/passengers", authenticate, profileController.listPassengers);

router.post("/passengers", authenticate, profileController.addPassenger);

router.patch("/passengers/:passengerId", authenticate, profileController.updatePassenger);

router.delete("/passengers/:passengerId", authenticate, profileController.deletePassenger);

export default router;