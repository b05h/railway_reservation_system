import { queryDB } from "../utils/db.js";

class AuditLog {
  static async find(filter, sort) {
    let query = `SELECT * FROM audit_logs`;
    const values = [];
    const conditions = [];

    if (filter.id) {
      conditions.push(`id = $${values.length + 1}`);
      values.push(filter.id);
    }
    if (filter.userId) {
      conditions.push(`user_id = $${values.length + 1}`);
      values.push(filter.userId);
    }
    if (filter.action) {
      conditions.push(`action = $${values.length + 1}`);
      values.push(filter.action);
    }
    if (filter.before) {
      conditions.push(`timestamp < $${values.length + 1}`);
      values.push(filter.before);
    }
    if (filter.after) {
      conditions.push(`timestamp > $${values.length + 1}`);
      values.push(filter.after);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const sortableFields = ["timestamp"];
    const sortOrders = ["ASC", "DESC"];

    if (sort.sortBy && sortableFields.includes(sort.sortBy)) {
      const sortOrder = sortOrders.includes(sort.sortOrder)
        ? sort.sortOrder
        : "ASC";
      query += ` ORDER BY ${sort.sortBy} ${sortOrder}`;
    }

    if (filter.limit) {
      query += ` LIMIT $${values.length + 1} `;
      values.push(filter.limit);
    }
    if (filter.page) {
      query += ` OFFSET $${valuesCount} `;
      values.push((filter.page - 1) * filter.limit);
    }

    const result = await queryDB(query, values);
    return result.rows;
  }
}

export default AuditLog;
