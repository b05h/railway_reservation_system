import SeatTypeModel from "../models/seatTypeModel.js";
import { asyncErrorHandler } from "../utils/errors.js";
import { AppError } from "../utils/errors.js";
import * as z from "zod";

const createSeatType = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    name: z.string().min(2),
    description: z.string(),
  });
  const { name, description } = await schema.parseAsync(req.body);

  const seatType = await SeatTypeModel.create(name, description);
  res.success({ seatType }, { status: 201 });
});

const getSeatTypes = asyncErrorHandler(async (req, res) => {
  const querySchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.string().optional(),
    id: z.uuid().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
  });
  const { page, limit, sortBy, sortOrder, id, name, description } =
    await querySchema.parseAsync(req.query);
  const seatTypes = await SeatTypeModel.find(
    { id, name, description, page, limit },
    { sortBy, sortOrder },
  );
  if (!seatTypes || seatTypes.length === 0) {
    throw new AppError(404, "Seat types not found");
  }
  res.success({ seatTypes });
});

const getSeatTypeById = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    id: z.uuid(),
  });
  const { id } = await schema.parseAsync(req.params);

  const seatType = await SeatTypeModel.findById(id);
  if (!seatType) {
    throw new AppError(404, "Seat type not found");
  }
  res.success({ seatType });
});

const updateSeatType = asyncErrorHandler(async (req, res) => {
  const paramSchema = z.object({
    id: z.uuid(),
  });
  const bodySchema = z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
  });
  const { id } = await paramSchema.parseAsync(req.params);
  const { name, description } = await bodySchema.parseAsync(req.body);

  const seatType = await SeatTypeModel.update(id, { name, description });
  if (!seatType) {
    throw new AppError(404, "Seat type not found");
  }
  res.success({ seatType });
});

const deleteSeatType = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    id: z.uuid(),
  });
  const { id } = await schema.parseAsync(req.params);

  const result = await SeatTypeModel.delete(id);
  if (!result) {
    throw new AppError(404, "Seat type not found");
  }
  res.success({ message: "Seat type deleted successfully" });
});

export default {
  createSeatType,
  getSeatTypes,
  getSeatTypeById,
  updateSeatType,
  deleteSeatType,
};

