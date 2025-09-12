import { queryDB } from "../utils/db.js";

class Train {
  static TABLE = "trains";

  static async create(name, code) {
    const query = `INSERT INTO ${this.TABLE} (name, code) VALUES ($1, $2) RETURNING *`;
    const values = [name, code];
    const result = await queryDB(query, values);
    return result.rows[0]; 
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.TABLE} WHERE id = $1`;
    const values = [id];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async findAll({ limit = 100, offset = 0 } = {}) {
    const query = `SELECT * FROM ${this.TABLE} ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
    const values = [limit, offset];
    const result = await queryDB(query, values);
    return result.rows;
  }

  static async update(id, name, code) {
    const query = `UPDATE ${this.TABLE} SET name = $1, code = $2, updated_at = NOW() WHERE id = $3 RETURNING *`;
    const values = [name, code, id];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM ${this.TABLE} WHERE id = $1`;
    const values = [id];
    const result = await queryDB(query, values);
    return result; 
  }
}

export default Train;
