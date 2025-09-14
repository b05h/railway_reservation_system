import { CoachType } from "../models/index.js";
import { asyncErrorHandler } from "../utils/errors.js";
import { AppError } from "../utils/errors.js";
import * as z from "zod";

const get = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    id: z.uuid().optional(),
    name: z.string().min(3).max(50).optional(),
    page: z.number().min(1).max(100).optional(),
    limit: z.number().min(1).max(100).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.string().optional(),
  });

  const { id, name, page, limit, sortBy, sortOrder } = await schema.parseAsync(
    req.query,
  );

  const coachTypes = await CoachType.find(
    { id, name, page, limit },
    { sortBy, sortOrder },
  );
  if (!coachTypes || coachTypes.length === 0) {
    throw new AppError(404, "Coach type not found");
  }
  return res.success({ coachTypes });
});

const getById = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    id: z.uuid(),
  });
  const { id } = await schema.parseAsync(req.params);

  const coachType = (await CoachType.find({ id }))[0];
  if (!coachType) {
    throw new AppError(404, "Coach type not found");
  }
  return res.success({ coachType });
});

const create = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    name: z.string().min(3).max(50),
  });
  const { name } = await schema.parseAsync(req.body);

  const coachType = await CoachType.create(name);
  if (!coachType) {
    throw new AppError(400, "Coach type could not be created");
  }
  return res.success({ coachType });
});

const update = asyncErrorHandler(async (req, res) => {
  const bodySchema = z.object({
    name: z.string().min(3).max(50),
  });
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const { id } = await paramsSchema.parseAsync(req.params);
  const { name } = await bodySchema.parseAsync(req.body);

  const coachType = await CoachType.update(id, name);
  if (!coachType) {
    throw new AppError(404, "Coach type not found");
  }
  return res.success({ coachType });
});

const remove = asyncErrorHandler(async (req, res) => {
  const schema = z.object({
    id: z.uuid(),
  });
  const { id } = await schema.parseAsync(req.params);

  const coachType = await CoachType.delete(id);
  if (!coachType) {
    throw new AppError(404, "Coach type not found");
  }
  return res.success({ coachType });
});

export default {
  get,
  getById,
  create,
  update,
  remove,
};
