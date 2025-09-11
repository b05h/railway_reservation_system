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
  pgm.createTable("coaches", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    train_id: {
      type: "uuid",
      notNull: true,
      references: "trains(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    coach_type_id: {
      type: "uuid",
      notNull: true,
      references: "coach_types(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    code: {
      type: "text",
      notNull: true,
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
  pgm.dropTable("coaches");
};
