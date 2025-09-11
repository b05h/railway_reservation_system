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
  pgm.createTable("booked_passengers", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    booking_id: {
      type: "uuid",
      notNull: true,
      references: "bookings(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    passenger_id: {
      type: "uuid",
      notNull: true,
      references: "passengers(id)",
      onDelete: "cascade",
      onUpdate: "cascade",
    },
    name: {
      type: "text",
      notNull: true,
    },
    gender: {
      type: "text",
      notNull: true,
    },
    age: {
      type: "integer",
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
  pgm.dropTable("booked_passengers");
};
