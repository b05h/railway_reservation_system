import StationDistance from "../models/stationDistanceModel.js";
import { asyncErrorHandler, AppError } from "../utils/errors.js";
import * as z from "zod";

const createDistance = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    from_station_id: z.string().uuid(),
    to_station_id: z.string().uuid(),
    distance: z.number().positive(),
  });

  const { from_station_id, to_station_id, distance } = await schema.parseAsync(req.body);

  const newDistance = await StationDistance.create(from_station_id, to_station_id, distance);
  res.success({ distance: newDistance }, { status: 201 });
});

const getAllDistances = asyncErrorHandler(async (req, res) => {
  const distances = await StationDistance.findAll();
  res.success({ distances });
});

const getDistanceBetween = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    from: z.string().uuid(),
    to: z.string().uuid(),
  });

  const { from, to } = await schema.parseAsync(req.query);
  const distance = await StationDistance.findBetween(from, to);

  if (!distance) throw new AppError(404, "Distance not found");
  res.success({ distance });
});

const updateDistance = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    id: z.string().uuid(),
    distance: z.number().positive(),
  });

  const { id, distance } = await schema.parseAsync(req.body);
  const updatedDistance = await StationDistance.update(id, distance);

  if (!updatedDistance) throw new AppError(404, "Distance not found");
  res.success({ distance: updatedDistance });
});

const deleteDistance = asyncErrorHandler(async (req, res) => {
  const schema = z.object({ id: z.string().uuid() });
  const { id } = await schema.parseAsync(req.body);

  const result = await StationDistance.delete(id);
  if (result.rowCount === 0) throw new AppError(404, "Distance not found");
  res.success({ message: "Distance deleted successfully" });
});

export default {
  createDistance,
  getAllDistances,
  getDistanceBetween,
  updateDistance,
  deleteDistance,
};
