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
  pgm.createTable("booked_seat", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    booking_id: {
      type: "uuid",
      notNull: true,
      references: "booking(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    booked_passenger_id: {
      type: "uuid",
      notNull: true,
      references: "booked_passenger(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    seat_id: {
      type: "uuid",
      notNull: true,
      references: "seat(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
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
export const down = (pgm) => {
  pgm.dropTable("booked_seat");
};
