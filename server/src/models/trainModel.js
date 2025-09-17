import { pool, queryDB } from "../utils/db.js";

class Train {
  static TABLE = "trains";

  static async findAll() {
    const query = `
      SELECT id, name, code FROM ${this.TABLE}
      ORDER BY created_at DESC
    `;
    const result = await queryDB(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.TABLE} WHERE id = $1`;
    const values = [id];
    const result = await queryDB(query, values);
    return result.rows[0];
  }

  static async getTrainDetails(trainId) {
    const query = `
      SELECT 
        t.id AS train_id, t.name AS train_name, t.code AS train_code,
        c.id AS coach_id, c.code AS coach_code, ct.name AS coach_type_name,
        s.id AS seat_id, s.seat_number, st.name AS seat_type_name
      FROM trains t
      LEFT JOIN coaches c ON t.id = c.train_id
      LEFT JOIN coach_types ct ON c.coach_type_id = ct.id
      LEFT JOIN seats s ON c.id = s.coach_id
      LEFT JOIN seat_types st ON s.seat_type_id = st.id
      WHERE t.id = $1
      ORDER BY c.code, s.seat_number;
    `;
    const result = await queryDB(query, [trainId]);

    if (result.rows.length === 0) {
      return null;
    }

    const train = {
      id: result.rows[0].train_id,
      name: result.rows[0].train_name,
      code: result.rows[0].train_code,
      coaches: [],
    };
    
    let currentCoach = null;
    for (const row of result.rows) {
      if (!currentCoach || currentCoach.id !== row.coach_id) {
        currentCoach = {
          id: row.coach_id,
          code: row.coach_code,
          coach_type_name: row.coach_type_name,
          seats: [],
        };
        train.coaches.push(currentCoach);
      }
      if (row.seat_id) {
        currentCoach.seats.push({
          id: row.seat_id,
          seat_number: row.seat_number,
          seat_type_name: row.seat_type_name,
        });
      }
    }
    return train;
  }

  static async createTrainWithCoachesAndSeats(name, code, coaches) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN"); 

      const trainQuery = `INSERT INTO ${this.TABLE} (name, code) VALUES ($1, $2) RETURNING *`;
      const trainResult = await client.query(trainQuery, [name, code]);
      const newTrain = trainResult.rows[0];

      for (const coach of coaches) {
        const coachQuery = `INSERT INTO coaches (train_id, code, coach_type_id) VALUES ($1, $2, $3) RETURNING *`;
        const coachResult = await client.query(coachQuery, [
          newTrain.id,
          coach.code,
          coach.coach_type_id,
        ]);
        const newCoach = coachResult.rows[0];

        for (const seat of coach.seats) {
          const seatQuery = `INSERT INTO seats (coach_id, seat_number, seat_type_id) VALUES ($1, $2, $3)`;
          await client.query(seatQuery, [
            newCoach.id,
            seat.seat_number,
            seat.seat_type_id,
          ]);
        }
      }

      await client.query("COMMIT"); 
      return this.getTrainDetails(newTrain.id); 
    } catch (e) {
      await client.query("ROLLBACK"); 
      throw e;
    } finally {
      client.release(); 
    }
  }

  static async updateTrainWithCoachesAndSeats(trainId, data) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const trainUpdateQuery = `
          UPDATE ${this.TABLE}
          SET name = COALESCE($1, name), code = COALESCE($2, code), updated_at = NOW()
          WHERE id = $3
          RETURNING *;
        `;
      const updatedTrainResult = await client.query(trainUpdateQuery, [
        data.name,
        data.code,
        trainId,
      ]);
      if (updatedTrainResult.rows.length === 0) {
        throw new Error("Train not found for update");
      }
      if (data.coaches) {
        await client.query("DELETE FROM coaches WHERE train_id = $1", [trainId]);

        for (const coach of data.coaches) {
          const coachInsertQuery = `INSERT INTO coaches (train_id, code, coach_type_id) VALUES ($1, $2, $3) RETURNING *`;
          const coachResult = await client.query(coachInsertQuery, [
            trainId,
            coach.code,
            coach.coach_type_id,
          ]);
          const newCoach = coachResult.rows[0];

          for (const seat of coach.seats) {
            const seatInsertQuery = `INSERT INTO seats (coach_id, seat_number, seat_type_id) VALUES ($1, $2, $3)`;
            await client.query(seatInsertQuery, [
              newCoach.id,
              seat.seat_number,
              seat.seat_type_id,
            ]);
          }
        }
      }

      await client.query("COMMIT");
      return this.getTrainDetails(trainId);
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }

  static async deleteTrain(trainId) {
    const query = `DELETE FROM ${this.TABLE} WHERE id = $1 RETURNING *`;
    const result = await queryDB(query, [trainId]);
    return result.rows[0];
  }

  // Search trains between two stations on a given date, optionally filtered by coach class
  static async searchTrains(from, to, coachClass, date) {
    let query = `
      SELECT DISTINCT t.id, t.name, t.code, s.departure_date
      FROM trains t
      JOIN schedules s ON s.train_id = t.id
      JOIN schedule_stops ss_from ON ss_from.schedule_id = s.id
      JOIN schedule_stops ss_to ON ss_to.schedule_id = s.id
      WHERE ss_from.station_id = $1
        AND ss_to.station_id = $2
        AND s.departure_date = $3
        AND ss_from.stop_number < ss_to.stop_number
    `;

    const params = [from, to, date];

    if (coachClass) {
      query += `
        AND EXISTS (
          SELECT 1 FROM coaches c
          WHERE c.train_id = t.id
            AND c.coach_type_id = $4
        )
      `;
      params.push(coachClass);
    }

    const { rows } = await queryDB(query, params);
    return rows;
  }

  // Get the schedule/stops for a given train
  static async getSchedule(trainId) {
    const query = `
      SELECT 
        st.name AS station_name,
        ss.stop_number,
        ss.arrival_time,
        ss.departure_time
      FROM schedule_stops ss
      JOIN schedules sc ON ss.schedule_id = sc.id
      JOIN stations st ON ss.station_id = st.id
      WHERE sc.train_id = $1
      ORDER BY ss.stop_number;
    `;

    const { rows } = await queryDB(query, [trainId]);
    return rows;
  }

  // Get seat availability for a train on a specific date
  static async getAvailability(trainId, date) {
    const query = `
      SELECT 
        c.id AS coach_id,
        ct.name AS coach_type,
        COUNT(s.id) AS total_seats,
        COUNT(bs.id) FILTER (
          WHERE b.schedule_id IN (
            SELECT id FROM schedules 
            WHERE train_id = c.train_id 
              AND departure_date = $2
          )
        ) AS booked_seats,
        COUNT(s.id) - COUNT(bs.id) FILTER (
          WHERE b.schedule_id IN (
            SELECT id FROM schedules 
            WHERE train_id = c.train_id 
              AND departure_date = $2
          )
        ) AS available_seats
      FROM coaches c
      JOIN coach_types ct ON ct.id = c.coach_type_id
      JOIN seats s ON s.coach_id = c.id
      LEFT JOIN booked_seats bs ON bs.seat_id = s.id
      LEFT JOIN bookings b ON b.id = bs.booking_id
      WHERE c.train_id = $1
      GROUP BY c.id, ct.name
      ORDER BY ct.name;
    `;

    const { rows } = await queryDB(query, [trainId, date]);
    return rows;
  }
}

export default Train;
