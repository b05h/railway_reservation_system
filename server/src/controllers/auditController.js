import { asyncErrorHandler } from "../utils/errors.js";
import Audit from "../models/";

const filterAudits = asyncErrorHandler(async (req, res, next) => {
  const { page, limit, sortOrder, sortBy, action, userId, before, after } =
    req.query;
  const audits = await Audit.filter({
    page,
    limit,
    sortOrder,
    sortBy,
    userId,
    action,
    before,
    after,
  });
  res.success({ audits });
});

export default {
  filterAudits,
};
