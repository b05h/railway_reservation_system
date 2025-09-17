import { queryDB } from "../utils/db.js";

class StationDistance {
  static TABLE = "station_distances";

  static async create(from_station_id, to_station_id, distance) {
    const query = `INSERT INTO ${this.TABLE} (from_station_id, to_station_id, distance) VALUES ($1, $2, $3) RETURNING *`;
    const values = [from_station_id, to_station_id, distance];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = `SELECT * FROM ${this.TABLE}`;
    const result = await queryDB(query);
    return result.rows;
  }

  static async findBetween(from_station_id, to_station_id) {
  const query = `
    SELECT * FROM ${this.TABLE}
    WHERE (from_station_id = $1 AND to_station_id = $2)
    OR (from_station_id = $2 AND to_station_id = $1)
  `;
  const values = [from_station_id, to_station_id];
  const result = await queryDB(query, values);
  return result.rows[0];
}

  static async update(id, distance) {
    const query = `UPDATE ${this.TABLE} SET distance = $1, updated_at = NOW() WHERE id = $2 RETURNING *`;
    const values = [distance, id];
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

export default StationDistance;
