import { Schedule, ScheduleStops } from "../models/index.js";
import { AppError, asyncErrorHandler } from "../utils/errors.js";
import * as z from "zod";

const schema = z.object({
  trainId: z.uuid(),
  departureDate: z.date(),
  departureTime: z.string(),
  scheduleStops: z.array(
    z.object({
      scheduleId: z.uuid(),
      stationId: z.uuid(),
      stopNumber: z.number(),
      arrivalTime: z.string(),
      departureTime: z.string(),
    }),
  ),
});

const get = asyncErrorHandler(async (req, res, next) => {
  const querySchema = z.object({
    trainId: z.uuid().optional(),
    departureDate: z.date().optional(),
    departureTime: z.string().optional(),
    limit: z.number().optional(),
    page: z.number().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.string().optional(),
  });
  const {
    trainId,
    departureDate,
    departureTime,
    limit,
    page,
    sortBy,
    sortOrder,
  } = await querySchema.parseAsync(req.query);

  const schedules = await Schedule.find(
    { trainId, departureDate, departureTime, limit, page },
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
    throw new AppError("Could not create schedule", 400);
  }

  const scheduleStopsResults = await Promise.all(
    scheduleStops.map(({ stationId, stopNumber, arrivalTime, departureTime }) =>
      ScheduleStops.create({
        scheduleId: schedule.id,
        stationId,
        stopNumber,
        arrivalTime,
        departureTime,
      }),
    ),
  );

  if (!(scheduleStopsResults && scheduleStopsResults.length > 0)) {
    throw new AppError("Could not create schedule stops", 400);
  }
  res.success(schedule);
});

const update = asyncErrorHandler(async (req, res, next) => {
  const paramSchema = z.object({
    id: z.uuid(),
  });
  const { id } = await paramSchema.parseAsync(req.params);
  const updateSchema = schema.optional();
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
    throw new AppError("Could not update schedule", 400);
  }

  const scheduleStopsResults = Promise.all(
    scheduleStops.map(
      async ({ id, stationId, stopNumber, arrivalTime, departureTime }) => {
        return await ScheduleStops.update({
          id,
          scheduleId: schedule.id,
          stationId,
          stopNumber,
          arrivalTime,
          departureTime,
        });
      },
    ),
  );

  if (!(scheduleStopsResults && scheduleStopsResults.length > 0)) {
    throw new AppError("Could not update schedule stops", 400);
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
    throw new AppError("Could not delete schedule", 400);
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
