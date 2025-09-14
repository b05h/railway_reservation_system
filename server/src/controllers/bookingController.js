import * as z from "zod";
import Booking from "../models/bookingModel.js";
import { AppError } from "../utils/errors.js";

// GET /bookings — list user's active + past bookings
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAllByUser(req.userId.id); // <-- use .id
    return res.success({ bookings }, { count: bookings.length });
  } catch (err) {
    next(err);
  }
};

// GET /bookings/:bookingId — get booking details
const getBookingById = async (req, res, next) => {
  try {
    const schema = z.object({ bookingId: z.string().uuid() });
    const { bookingId } = schema.parse(req.params);

    const booking = await Booking.findByIdAndUser(bookingId, req.userId.id); // <-- .id
    if (!booking) throw new AppError(404, "Booking not found");

    return res.success({ booking });
  } catch (err) {
    next(err);
  }
};

// POST /bookings — create new booking (initiates seat lock)
const createBooking = async (req, res, next) => {
  try {
    const schema = z.object({
      scheduleId: z.string().uuid(),
      fromStationId: z.string().uuid(),
      toStationId: z.string().uuid(),
      statusId: z.string().uuid(),
      totalAmount: z.number(),
    });

    const { scheduleId, fromStationId, toStationId, statusId, totalAmount } =
      schema.parse(req.body);

    const booking = await Booking.create(
      req.userId.id, // <-- .id
      scheduleId,
      fromStationId,
      toStationId,
      statusId,
      totalAmount
    );

    return res.success({ booking }, { status: 201 });
  } catch (err) {
    next(err);
  }
};

// PATCH /bookings/:bookingId/confirm — confirm booking after payment
const confirmBooking = async (req, res, next) => {
  try {
    const schema = z.object({ bookingId: z.string().uuid() });
    const { bookingId } = schema.parse(req.params);

    const booking = await Booking.confirmBooking(bookingId, req.userId.id); // <-- .id
    if (!booking) throw new AppError(404, "Booking not found");

    return res.success({ booking });
  } catch (err) {
    next(err);
  }
};

// PATCH /bookings/:bookingId/cancel — cancel booking (trigger refund)
const cancelBooking = async (req, res, next) => {
  try {
    const schema = z.object({ bookingId: z.string().uuid() });
    const { bookingId } = schema.parse(req.params);

    const booking = await Booking.cancelBooking(bookingId, req.userId.id); // <-- .id
    if (!booking) throw new AppError(404, "Booking not found");

    return res.success({ booking });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllBookings,
  getBookingById,
  createBooking,
  confirmBooking,
  cancelBooking,
};
