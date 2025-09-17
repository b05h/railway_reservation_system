import express from "express";
import authenticate from "../middleware/authenticate.js";
import bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.use(authenticate);

router.get("/", bookingController.getAllBookings);
router.get("/:bookingId", bookingController.getBookingById);
router.post("/", bookingController.createBooking);
router.patch("/:bookingId/confirm", bookingController.confirmBooking);
router.patch("/:bookingId/cancel", bookingController.cancelBooking);

export default router;