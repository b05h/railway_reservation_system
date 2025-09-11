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
  pgm.createTable("seats", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    coach_id: {
      type: "uuid",
      notNull: true,
      references: "coaches(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    seat_number: {
      type: "integer",
      notNull: true,
    },
    seat_type_id: {
      type: "uuid",
      notNull: true,
      references: "seat_types(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("seats");
};
