import { queryDB } from "../utils/db.js";

class AuditLog {
  static async findAll() {
    const query = `SELECT * FROM audit_logs`;
    const auditLogs = await queryDB(query);
    return auditLogs.rows;
  }

  static async findById(id) {
    const query = `SELECT * FROM audit_logs WHERE id = $1`;
    const values = [id];
    const auditLog = await queryDB(query, values);
    return auditLog.rows[0];
  }

  static async filter(filter) {
    const query = `SELECT * FROM audit_logs`;
    const values = [];
    let hasWhereClause = false;
    if (filter.userId) {
      if (hasWhereClause) {
        query += ` AND`;
      } else {
        hasWhereClause = true;
        query += ` WHERE`;
      }
      query += ` user_id = $1`;
      values.push(filter.userId);
    }
    if (filter.action) {
      if (hasWhereClause) {
        query += ` AND`;
      } else {
        hasWhereClause = true;
        query += ` WHERE`;
      }
      query += ` action = $1`;
      values.push(filter.action);
    }
    if (filter.before) {
      if (hasWhereClause) {
        query += ` AND`;
      } else {
        hasWhereClause = true;
        query += ` WHERE`;
      }
      query += ` timestamp < $1`;
      values.push(filter.before);
    }
    if (filter.after) {
      if (hasWhereClause) {
        query += ` AND`;
      } else {
        hasWhereClause = true;
        query += ` WHERE`;
      }
      query += ` timestamp > $1`;
      values.push(filter.after);
    }
    if (filter.sortBy) {
      query += ` ORDER BY ${filter.sortBy} ${filter.sortOrder}`;
    }
    if (filter.page) {
      query += ` LIMIT $2 OFFSET $3`;
      values.push(filter.limit);
      values.push(filter.page * filter.limit);
    }
    const auditLogs = await queryDB(query, values);
    return auditLogs.rows;
  }
}

export default AuditLog;
