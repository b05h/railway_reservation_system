import { queryDB } from "../utils/db.js";

class CoachType {
  static async find(filter, sort) {
    let query = "SELECT * FROM coach_types";
    const values = [];
    const conditions = [];

    if (filter.id) {
      conditions.push(`id = $${values.length + 1}`);
      values.push(filter.id);
    }
    if (filter.name) {
      conditions.push(`name = $${values.length + 1}`);
      values.push(filter.name);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const sortableFields = ["name"];
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
      query += ` OFFSET $${values.length + 1} `;
      values.push((filter.page - 1) * filter.limit);
    }

    const result = await queryDB(query, values);
    return result.rows;
  }

  static async create(coachTypeName) {
    const query = `INSERT INTO coach_types (name) VALUES ($1) RETURNING *`;
    const values = [coachTypeName];
    const coachType = await queryDB(query, values);
    return coachType.rows[0];
  }

  static async update(id, coachTypeName) {
    const query = `UPDATE coach_types SET name = $1 WHERE id = $2`;
    const values = [coachTypeName, id];
    await queryDB(query, values);
  }

  static async delete(id) {
    const query = `DELETE FROM coach_types WHERE id = $1`;
    const values = [id];
    await queryDB(query, values);
  }
}

export default CoachType;
