import { Router } from "express";
import seatTypeController from "../controllers/seatTypeController.js";

const router = Router();

router.post("/", seatTypeController.createSeatType);
router.get("/", seatTypeController.getSeatTypes);
router.get("/:id", seatTypeController.getSeatTypeById);
router.patch("/:id", seatTypeController.updateSeatType);
router.delete("/:id", seatTypeController.deleteSeatType);

export default router;
