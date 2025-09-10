/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("refund", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    payment_id: {
      type: "uuid",
      notNull: true,
      references: "payment(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    amount: {
      type: "money",
      notNull: true,
    },
    status_id: {
      type: "uuid",
      notNull: true,
      references: "refund_status(id)",
    },
    refund_date: {
      type: "date",
      notNull: true,
      default: pgm.func("current_date()"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp()"),
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp()"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};

