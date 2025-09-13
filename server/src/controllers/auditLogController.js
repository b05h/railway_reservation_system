import { asyncErrorHandler } from "../utils/errors.js";
import { Audit } from "../models/index.js";
import { AppError } from "../utils/errors.js";
import * as z from "zod";

const get = asyncErrorHandler(async (req, res, next) => {
  const schema = z.object({
    page: z.number().min(1).max(100).optional(),
    limit: z.number().min(1).max(100).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.string().optional(),
    userId: z.string().optional(),
    action: z.string().optional(),
    before: z.string().optional(),
    after: z.string().optional(),
  });
  const { page, limit, sortOrder, sortBy, action, userId, before, after } =
    await schema.parseAsync(req.query);

  const audits = await Audit.find({
    page,
    limit,
    sortOrder,
    sortBy,
    userId,
    action,
    before,
    after,
  });

  if (!audits) {
    throw new AppError(404, "Audit not found");
  }
  res.success({ audits });
});

const getById = asyncErrorHandler(async (req, res, next) => {
  const paramSchema = z.object({
    id: z.uuid(),
  });
  const { id } = await paramSchema.parseAsync(req.params);
  const audit = await Audit.find({ id });
  if (!audit) {
    throw new AppError("Could not find audit", 400);
  }
  res.success(audit);
});

export default {
  get,
  getById,
};
