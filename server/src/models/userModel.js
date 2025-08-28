import { queryDB } from "../utils/db.js";

class User {
  static async create(name, email, password) {
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
    const values = [name, email, password];
    const user = await queryDB(query, values);
    return user;
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

  static async update(id, name, email, password) {
    const query = `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`;
    const values = [name, email, password, id];
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
