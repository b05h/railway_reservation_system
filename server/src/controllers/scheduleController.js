import { Schedule, ScheduleStops } from "../models/index.js";
import { AppError, asyncErrorHandler } from "../utils/errors.js";
import * as z from "zod";

const schema = z.object({
  trainId: z.uuid(),
  departureDate: z.coerce.date(),
  departureTime: z.string(),
  scheduleStops: z.array(
    z.object({
      stationId: z.uuid(),
      stopNumber: z.number(),
      arrivalTime: z.string(),
      departureTime: z.string(),
    }),
  ),
});

const get = asyncErrorHandler(async (req, res, next) => {
  const querySchema = z.object({
    id: z.uuid().optional(),
    trainId: z.uuid().optional(),
    departureDate: z.coerce.date().optional(),
    departureTime: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.string().optional(),
  });

  const {
    id,
    trainId,
    departureDate,
    departureTime,
    limit,
    page,
    sortBy,
    sortOrder,
  } = await querySchema.parseAsync(req.query);

  const schedules = await Schedule.find(
    { id, trainId, departureDate, departureTime, limit, page },
    { sortBy, sortOrder },
  );

  if (!schedules || schedules.length === 0) {
    throw new AppError(400, "Could not find schedules");
  }

  res.success(schedules);
});

const getById = asyncErrorHandler(async (req, res, next) => {
  const paramSchema = z.object({
    id: z.uuid(),
  });
  const { id } = await paramSchema.parseAsync(req.params);

  const schedule = (await Schedule.find({ id }))[0];
  if (!schedule) {
    throw new AppError(400, "Could not find schedule");
  }

  res.success(schedule);
});

const create = asyncErrorHandler(async (req, res, next) => {
  const { trainId, departureDate, departureTime, scheduleStops } =
    await schema.parseAsync(req.body);
  const schedule = await Schedule.create({
    trainId,
    departureDate,
    departureTime,
    scheduleStops,
  });

  if (!schedule) {
    throw new AppError(400, "Could not create schedule");
  }

  res.success(schedule);
});

const update = asyncErrorHandler(async (req, res, next) => {
  const paramSchema = z.object({
    id: z.uuid(),
  });
  const { id } = await paramSchema.parseAsync(req.params);

  const updateSchema = schema.partial();
  const { trainId, departureDate, departureTime, scheduleStops } =
    await updateSchema.parseAsync(req.body);

  const schedule = await Schedule.update({
    id,
    trainId,
    departureDate,
    departureTime,
    scheduleStops,
  });

  if (!schedule) {
    throw new AppError(400, "Could not update schedule");
  }

  res.success(schedule);
});

const remove = asyncErrorHandler(async (req, res, next) => {
  const paramSchema = z.object({
    id: z.uuid(),
  });
  const { id } = await paramSchema.parseAsync(req.params);
  const schedule = await Schedule.delete(id);
  if (!schedule) {
    throw new AppError(400, "Could not delete schedule");
  }
  res.success(schedule);
});

export default {
  get,
  getById,
  create,
  update,
  remove,
};
