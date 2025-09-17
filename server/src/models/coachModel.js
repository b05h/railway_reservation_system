import { queryDB } from "../utils/db.js";

class Coach {
  static TABLE = "coaches";

  static async create(trainId, code, coachTypeId) {
    const query = `INSERT INTO ${this.TABLE} (train_id, code, coach_type_id) VALUES ($1, $2, $3) RETURNING *`;
    const values = [trainId, code, coachTypeId];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.TABLE} WHERE id = $1`;
    const values = [id];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async findByTrainId(trainId) {
    const query = `SELECT * FROM ${this.TABLE} WHERE train_id = $1`;
    const values = [trainId];
    const result = await queryDB(query, values);
    return result.rows;
  }

  static async update(id, code, coachTypeId) {
    const query = `UPDATE ${this.TABLE} SET code = COALESCE($1, code), coach_type_id = COALESCE($2, coach_type_id), updated_at = NOW() WHERE id = $3 RETURNING *`;
    const values = [code, coachTypeId, id];
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

export default Coach;