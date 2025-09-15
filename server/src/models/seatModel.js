import { queryDB } from "../utils/db.js";

class Seat {
  static TABLE = "seats";

  static async create(coachId, seatNumber, seatTypeId) {
    const query = `INSERT INTO ${this.TABLE} (coach_id, seat_number, seat_type_id) VALUES ($1, $2, $3) RETURNING *`;
    const values = [coachId, seatNumber, seatTypeId];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.TABLE} WHERE id = $1`;
    const values = [id];
    const result = await queryDB(query, values);
    return result.rows[0];
  }
  
  static async findByCoachId(coachId) {
    const query = `SELECT * FROM ${this.TABLE} WHERE coach_id = $1`;
    const values = [coachId];
    const result = await queryDB(query, values);
    return result.rows;
  }

  static async update(id, seatNumber, seatTypeId) {
    const query = `UPDATE ${this.TABLE} SET seat_number = COALESCE($1, seat_number), seat_type_id = COALESCE($2, seat_type_id), updated_at = NOW() WHERE id = $3 RETURNING *`;
    const values = [seatNumber, seatTypeId, id];
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

export default Seat;