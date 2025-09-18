import Train from "../models/trainModel.js";
import { asyncErrorHandler, AppError } from "../utils/errors.js";
import * as z from "zod";

const createTrain = asyncErrorHandler(async (req, res, next) => {
  const seatSchema = z.object({
    seat_number: z
      .number()
      .int()
      .min(1, "Seat number must be a positive integer."),
    seat_type_id: z.uuid("Invalid UUID for seat type."),
  });

  const coachSchema = z.object({
    code: z
      .string()
      .min(1, "Coach code is required.")
      .max(20, "Coach code is too long."),
    coach_type_id: z.uuid("Invalid UUID for coach type."),
    seats: z
      .array(seatSchema)
      .min(1, "Each coach must have at least one seat."),
  });

  const trainSchema = z.object({
    name: z
      .string()
      .min(3, "Train name is too short.")
      .max(100, "Train name is too long."),
    code: z
      .string()
      .min(2, "Train code is too short.")
      .max(20, "Train code is too long."),
    coaches: z
      .array(coachSchema)
      .min(1, "A train must have at least one coach."),
  });

  const { name, code, coaches } = await trainSchema.parseAsync(req.body);

  const newTrain = await Train.createTrainWithCoachesAndSeats(
    name,
    code,
    coaches,
  );

  res.success({ train: newTrain }, { status: 201 });
});

const getAllTrains = asyncErrorHandler(async (req, res, next) => {
  const trains = await Train.findAll();
  res.success({ trains });
});

const getTrainById = asyncErrorHandler(async (req, res, next) => {
  const schema = z.object({
    trainId: z.uuid("Invalid UUID format for trainId."),
  });
  const { trainId } = await schema.parseAsync(req.params);

  const train = await Train.getTrainDetails(trainId);
  if (!train) {
    throw new AppError(404, "Train not found.");
  }

  res.success({ train });
});

const updateTrain = asyncErrorHandler(async (req, res, next) => {
  const paramSchema = z.object({
    trainId: z.uuid("Invalid UUID format for trainId."),
  });

  const updateCoachSchema = z.object({
    id: z.uuid("Invalid UUID for coach id.").optional(),
    code: z.string().min(1).max(20),
    coach_type_id: z.uuid(),
    seats: z
      .array(
        z.object({
          id: z.uuid().optional(),
          seat_number: z.number().int().min(1),
          seat_type_id: z.uuid(),
        }),
      )
      .min(1),
  });

  const updateTrainSchema = z.object({
    name: z.string().min(3).max(100).optional(),
    code: z.string().min(2).max(20).optional(),
    coaches: z.array(updateCoachSchema).optional(),
  });

  const { trainId } = await paramSchema.parseAsync(req.params);
  const data = await updateTrainSchema.parseAsync(req.body);

  const updatedTrain = await Train.updateTrainWithCoachesAndSeats(
    trainId,
    data,
  );
  if (!updatedTrain) {
    throw new AppError(404, "Train not found or could not be updated.");
  }

  res.success({ train: updatedTrain });
});

const deleteTrain = asyncErrorHandler(async (req, res, next) => {
  const schema = z.object({
    trainId: z.uuid("Invalid UUID format for trainId."),
  });
  const { trainId } = await schema.parseAsync(req.params);

  const deletedTrain = await Train.deleteTrain(trainId);
  if (!deletedTrain) {
    throw new AppError(404, "Train not found.");
  }

  res.success({
    message: "Train and associated coaches/seats deleted successfully.",
  });
});

const configureSeatChart = asyncErrorHandler(async (req, res, next) => {
  const seatSchema = z.object({
    seat_number: z
      .number()
      .int()
      .min(1, "Seat number must be a positive integer."),
    seat_type_id: z.uuid("Invalid UUID for seat type."),
  });
  const coachSchema = z.object({
    code: z
      .string()
      .min(1, "Coach code is required.")
      .max(20, "Coach code is too long."),
    coach_type_id: z.uuid("Invalid UUID for coach type."),
    seats: z
      .array(seatSchema)
      .min(1, "Each coach must have at least one seat."),
  });

  const seatChartSchema = z.object({
    coaches: z
      .array(coachSchema)
      .min(1, "A seat chart must have at least one coach."),
  });
  const paramSchema = z.object({
    trainId: z.uuid("Invalid UUID format for trainId."),
  });

  const { trainId } = await paramSchema.parseAsync(req.params);
  const { coaches } = await seatChartSchema.parseAsync(req.body);

  const updatedTrain = await Train.updateTrainWithCoachesAndSeats(trainId, {
    coaches,
  });

  if (!updatedTrain) {
    throw new AppError(
      404,
      "Train not found or seat chart could not be configured.",
    );
  }

  res.success({ train: updatedTrain });
});

export default {
  createTrain,
  getAllTrains,
  getTrainById,
  updateTrain,
  deleteTrain,
  configureSeatChart,
};

