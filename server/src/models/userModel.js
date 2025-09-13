import { queryDB } from "../utils/db.js";

class User {
  static async create(name, email, password_hash, role_id) {
    const query = `INSERT INTO users (name, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING id, name, email`;
    const values = [name, email, password_hash, role_id];
    const user = await queryDB(query, values);
    return user.rows[0];
  }

  static async findById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const values = [id];
    const user = await queryDB(query, values);
    return user.rows[0];
  }

  static async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const user = await queryDB(query, values);
    return user.rows[0];
  }

  static async update(id, name, email, password_hash) {
    const query = `UPDATE users SET name = $1, email = $2, password_hash = $3 WHERE id = $4`;
    const values = [name, email, password_hash, id];
    const user = await queryDB(query, values);
    return user;
  }

  static async delete(id) {
    const query = `DELETE FROM users WHERE id = $1`;
    const values = [id];
    const user = await queryDB(query, values);
    return user;
  }
}

export default User;
