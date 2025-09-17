import { queryDB } from "../utils/db.js";

// List all passengers for a user
export async function listPassengers(userId) {
  const { rows } = await queryDB(
    `SELECT id, name, email, age, created_at
     FROM passengers
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}


// Add a new passenger
export async function addPassenger(userId, { name, email, age }) {
  const { rows } = await queryDB(
    `INSERT INTO passengers (user_id, name, email, age)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, age, created_at`,
    [userId, name, email, age]
  );
  return rows[0];
}

// Update a passenger
export async function updatePassenger(userId, passengerId, { name, email, age }) {
  const updates = [];
  const values = [];
  let idx = 1;

  if (name !== undefined) {
    updates.push(`name = $${idx++}`);
    values.push(name);
  }
  if (email !== undefined) {
    updates.push(`email = $${idx++}`);
    values.push(email);
  }
  if (age !== undefined) {
    updates.push(`age = $${idx++}`);
    values.push(age);
  }

  if (updates.length === 0) return null;

  values.push(userId, passengerId);

  const { rows } = await queryDB(
    `UPDATE passengers
     SET ${updates.join(", ")}
     WHERE user_id = $${idx++} AND id = $${idx}
     RETURNING id, name, email, age, created_at`,
    values
  );
  return rows[0];
}

// Delete a passenger
export async function deletePassenger(userId, passengerId) {
  await queryDB(
    `DELETE FROM passengers
     WHERE user_id = $1 AND id = $2`,
    [userId, passengerId]
  );
}