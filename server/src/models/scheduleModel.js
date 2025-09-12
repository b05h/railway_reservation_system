import { queryDB } from "../utils/db.js";

class ScheduleModel {
  static async find(filter, sort) {
    const query = `SELECT * FROM schedules`;
    const values = [];
    const conditions = [];

    if (filter.id) {
      conditions.push(`id = $${values.length + 1}`);
      values.push(filter.id);
    }
    if (filter.trainId) {
      conditions.push(`train_id = $${values.length + 1}`);
      values.push(filter.trainId);
    }
    if (filter.departureDate) {
      conditions.push(`departure_date = $${values.length + 1}`);
      values.push(filter.departureDate);
    }
    if (filter.departureTime) {
      conditions.push(`departure_time = $${values.length + 1}`);
      values.push(filter.departureTime);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const sortableFields = ["departure_date", "departure_time"];

    if (sort.sortBy && sortableFields.includes(sort.sortBy)) {
      const sortOrder = sort.sortOrder || "ASC";
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

  static async create(schedule) {
    let query = `INSERT INTO schedules (train_id, departure_date, departure_time) VALUES ($1, $2, $3) RETURNING *`;
    const values = [
      schedule.trainId,
      schedule.departureDate,
      schedule.departureTime,
    ];
    return (await queryDB(query, values)).rows[0];
  }

  static async update(schedule) {
    let query = `UPDATE schedules SET train_id = $1, departure_date = $2, departure_time = $3 WHERE id = $4 RETURNING *`;
    const values = [
      schedule.trainId,
      schedule.departureDate,
      schedule.departureTime,
      schedule.id,
    ];
    return (await queryDB(query, values)).rows[0];
  }

  static async delete(id) {
    let query = `DELETE FROM schedules WHERE id = $1`;
    const values = [id];
    return (await queryDB(query, values)).rows[0];
  }
}

export default ScheduleModel;
