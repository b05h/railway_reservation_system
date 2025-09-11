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
  pgm.createTable("refunds", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    payment_id: {
      type: "uuid",
      notNull: true,
      references: "payments(id)",
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
      references: "refund_statuses(id)",
    },
    refund_date: {
      type: "date",
      notNull: true,
      default: pgm.func("CURRENT_DATE"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("refunds");
};
