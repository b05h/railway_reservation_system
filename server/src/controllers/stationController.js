import Station from "../models/stationModel.js";
import { asyncErrorHandler } from "../utils/errors.js";
import { AppError } from "../utils/errors.js";
import * as z from "zod";

const createStation = asyncErrorHandler(async (req, res, next) => {
  const schema = z.object({
    name: z.string().min(2).max(100),
    code: z.string().min(1).max(10),
    city: z.string().min(2).max(50),
  });

  const { name, code, city } = await schema.parseAsync(req.body);

  const station = await Station.create(name, code, city);

  res.success({ station }, { status: 201 });
});

const getAllStations = asyncErrorHandler(async (req, res, next) => {
  const { search = "", city = "" } = req.query;
  const stations = await Station.findAll({ search, city });
  res.success({ stations });
});

const getStationById = asyncErrorHandler(async (req, res, next) => {
  const schema = z.object({
    stationId: z.string().uuid(),
  });
  const { stationId } = await schema.parseAsync(req.params);

  const station = await Station.findById(stationId);
  if (!station) {
    throw new AppError(404, "Station not found");
  }

  res.success({ station });
});


const updateStation = asyncErrorHandler(async (req, res, next) => {
  const paramSchema = z.object({
    stationId: z.string().uuid(),
  });
  
  const bodySchema = z.object({
    name: z.string().min(2).max(100).optional(),
    code: z.string().min(1).max(20).optional(),
    city: z.string().min(2).max(50).optional(),
  });

  const { stationId } = await paramSchema.parseAsync(req.params);
  const updateData = await bodySchema.parseAsync(req.body);

  const station = await Station.update(stationId, updateData); 
  if (!station) {
    throw new AppError(404, "Station not found");
  }

  res.success({ station });
});

const deleteStation = asyncErrorHandler(async (req, res, next) => {
  const schema = z.object({
    stationId: z.string().uuid(),
  });
  const { stationId } = await schema.parseAsync(req.params);

  const station = await Station.delete(stationId);
  if (!station) {
    throw new AppError(404, "Station not found");
  }

  res.success({ message: "Station deleted successfully" });
});

export default {
  createStation,
  getAllStations,
  getStationById,
  updateStation,
  deleteStation,
};
