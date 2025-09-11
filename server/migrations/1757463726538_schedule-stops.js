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
  pgm.createTable("schedule_stops", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    schedule_id: {
      type: "uuid",
      notNull: true,
      references: "schedules(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    station_id: {
      type: "uuid",
      notNull: true,
      references: "stations(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    stop_number: {
      type: "integer",
      notNull: true,
    },
    arrival_time: {
      type: "time",
      notNull: true,
    },
    departure_time: {
      type: "time",
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
  pgm.dropTable("schedule_stops");
};
