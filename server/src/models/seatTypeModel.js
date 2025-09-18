import { queryDB } from "../utils/db.js";

class SeatType {
  static TABLE = "seat_types";

  static async create(name, description) {
    const query = `INSERT INTO ${this.TABLE} (name, description) VALUES ($1, $2) RETURNING *`;
    const values = [name, description];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async find(filter = {}, sort = {}) {
    let query = `SELECT * FROM ${this.TABLE}`;
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
    if (filter.description) {
      conditions.push(`description LIKE $${values.length + 1}`);
      values.push(`%${filter.description}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    if (sort) {
      const sortableFields = ["name", "description"];
      const sortOrders = ["ASC", "DESC"];
      const sortBy = sortableFields.includes(sort.sortBy)
        ? sort.sortBy
        : "name";
      const sortOrder = sortOrders.includes(sort.sortOrder)
        ? sort.sortOrder
        : "ASC";
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
    }

    const result = await queryDB(query, values);
    return result.rows;
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.TABLE} WHERE id = $1`;
    const result = await queryDB(query, [id]);
    return result.rows[0];
  }

  static async update(id, { name, description }) {
    const query = `UPDATE ${this.TABLE} SET name = COALESCE($1, name), description = COALESCE($2, description) WHERE id = $3 RETURNING *`;
    const values = [name, description, id];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM ${this.TABLE} WHERE id = $1 RETURNING *`;
    const values = [id];
    const result = await queryDB(query, values);
    return result.rows[0];
  }
}

export default SeatType;

