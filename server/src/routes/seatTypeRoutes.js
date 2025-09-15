import { Router } from "express";
import {
  createSeatType,
  getSeatTypes,
  updateSeatType,
  deleteSeatType,
} from "../controllers/seatTypeController.js";

const router = Router();

router.post("/", createSeatType);
router.get("/", getSeatTypes);
router.put("/:id", updateSeatType);
router.delete("/:id", deleteSeatType);

router.get("/test", (req, res) => {
  res.send("seat-types route is working");
});

export default router;
