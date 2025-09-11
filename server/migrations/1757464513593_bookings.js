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
  pgm.createTable("bookings", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    schedule_id: {
      type: "uuid",
      notNull: true,
      references: "schedules(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    from_station_id: {
      type: "uuid",
      notNull: true,
      references: "stations(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    to_station_id: {
      type: "uuid",
      notNull: true,
      references: "stations(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    booking_date: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
    status_id: {
      type: "uuid",
      notNull: true,
      references: "booking_statuses(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    pnr: {
      type: "text",
      notNull: true,
    },
    total_amount: {
      type: "numeric",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("bookings");
};
