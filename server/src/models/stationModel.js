import { queryDB } from "../utils/db.js";

class Station {
  static TABLE = "stations";

  static async create(name, code, city) {
    const query = `INSERT INTO ${this.TABLE} (name, code, city) VALUES ($1, $2, $3) RETURNING *`;
    const values = [name, code, city];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.TABLE} WHERE id = $1`;
    const result = await queryDB(query, [id]);
    return result.rows[0];
  }

  static async findAll({ search = "", city = "", limit = 100, offset = 0 } = {}) {
    const query = `SELECT * FROM ${this.TABLE} WHERE (name ILIKE $1 OR code ILIKE $1) AND (city ILIKE $2 OR $2 = '')
      ORDER BY created_at DESC LIMIT $3 OFFSET $4`;
    const values = [`%${search}%`, city, limit, offset];
    const result = await queryDB(query, values);
    return result.rows;
  }

  static async update(id, name, code, city) {
    const query = `
      UPDATE ${this.TABLE} SET name = $1, code = $2, city = $3, updated_at = NOW() WHERE id = $4 RETURNING *`;
    const values = [name, code, city, id];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM ${this.TABLE} WHERE id = $1 RETURNING *`;
    const result = await queryDB(query, [id]);
    return result.rows[0]; 
  }
}

export default Station;
