import { queryDB } from "../utils/db.js";

class Role {
  static async find(filter, sort) {
    let query = `SELECT * FROM roles`;
    const values = [];
    const conditions = [];
    if (filter) {
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
    }

    const sortableFields = ["name"];
    const sortOrders = ["ASC", "DESC"];

    if (sort) {
      if (sort.sortBy && sortableFields.includes(sort.sortBy)) {
        const sortOrder = sortOrders.includes(sort.sortOrder)
          ? sort.sortOrder
          : "ASC";
        query += ` ORDER BY ${sort.sortBy} ${sortOrder}`;
      }
    }

    if (filter) {
      if (filter.limit) {
        query += ` LIMIT $${values.length + 1} `;
        values.push(filter.limit);
      }
      if (filter.page) {
        query += ` OFFSET $${valuesCount} `;
        values.push((filter.page - 1) * filter.limit);
      }
    }

    const result = await queryDB(query, values);
    return result.rows;
  }
}

export default Role;
