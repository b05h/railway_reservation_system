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

const getDistances = asyncErrorHandler(async (req, res) => {
  const { from, to } = req.query;
  let distances;
  if (from && to) {
    const schema = z.object({
      from: z.string().uuid(),
      to: z.string().uuid(),
    });
    const { from: fromId, to: toId } = await schema.parseAsync(req.query);
    distances = await StationDistance.findBetween(fromId, toId);
  } else {
    distances = await StationDistance.findAll();
  }
  res.success({ distances });
});

const updateDistance = asyncErrorHandler(async (req, res) => {
  const paramSchema = z.object({
    id: z.string().uuid(),
  });
  const bodySchema = z.object({
    distance: z.number().positive(),
  });
  const { id } = await paramSchema.parseAsync(req.params);
  const { distance } = await bodySchema.parseAsync(req.body);
  const updatedDistance = await StationDistance.update(id, distance);
  if (!updatedDistance) throw new AppError(404, "Distance not found");
  res.success({ distance: updatedDistance });
});

const deleteDistance = asyncErrorHandler(async (req, res) => {
  const paramSchema = z.object({
    id: z.string().uuid(),
  });
  const { id } = await paramSchema.parseAsync(req.params);
  const result = await StationDistance.delete(id);
  if (result.rowCount === 0) throw new AppError(404, "Distance not found");
  res.success({ message: "Distance deleted successfully" });
});

const getDistanceBetween = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    from: z.string().uuid(),
    to: z.string().uuid(),
  });

  const { from, to } = await schema.parseAsync(req.query);

  const path = await StationDistance.findShortestPath(from, to);
  if (!path) throw new AppError(404, "No route found between the stations");

  res.success({ path });
});
export default {
  createDistance,
  getDistances,
  updateDistance,
  deleteDistance,
  getDistanceBetween,
};