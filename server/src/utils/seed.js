import { queryDB } from "./db.js";

const seedData = {
  roles: [{ name: "admin" }, { name: "customer" }],

  coachTypes: [
    { name: "Sleeper Class" },
    { name: "AC 3 Tier" },
    { name: "AC 2 Tier" },
    { name: "AC 1 Tier" },
    { name: "General" },
    { name: "AC Chair Car" },
  ],

  seatTypes: [
    { name: "Lower Berth", description: "Lower sleeping berth" },
    { name: "Middle Berth", description: "Middle sleeping berth" },
    { name: "Upper Berth", description: "Upper sleeping berth" },
    { name: "Side Lower", description: "Side lower berth" },
    { name: "Side Upper", description: "Side upper berth" },
    { name: "Chair", description: "Sitting chair" },
  ],

  bookingStatuses: [
    { name: "Confirmed" },
    { name: "Waiting" },
    { name: "RAC" },
    { name: "Cancelled" },
  ],

  paymentStatuses: [
    { name: "Pending" },
    { name: "Completed" },
    { name: "Failed" },
    { name: "Refunded" },
  ],

  refundStatuses: [
    { name: "Requested" },
    { name: "Processing" },
    { name: "Completed" },
    { name: "Rejected" },
  ],

  stations: [
    { name: "New Delhi Railway Station", code: "NDLS", city: "New Delhi" },
    { name: "Mumbai Central", code: "BCT", city: "Mumbai" },
    { name: "Howrah Junction", code: "HWH", city: "Kolkata" },
    { name: "Chennai Central", code: "MAS", city: "Chennai" },
    { name: "Bengaluru City Junction", code: "SBC", city: "Bengaluru" },
    { name: "Secunderabad Junction", code: "SC", city: "Hyderabad" },
    { name: "Pune Junction", code: "PUNE", city: "Pune" },
    { name: "Ahmedabad Junction", code: "ADI", city: "Ahmedabad" },
    { name: "Jaipur Junction", code: "JP", city: "Jaipur" },
    { name: "Lucknow Charbagh", code: "LKO", city: "Lucknow" },
  ],

  trains: [
    { name: "Rajdhani Express", code: "12301" },
    { name: "Shatabdi Express", code: "12002" },
    { name: "Duronto Express", code: "12259" },
    { name: "Garib Rath", code: "12215" },
    { name: "Jan Shatabdi", code: "12023" },
    { name: "Humsafar Express", code: "22405" },
    { name: "Tejas Express", code: "22119" },
    { name: "Vande Bharat Express", code: "22435" },
  ],
};

const seedTable = async (tableName, data, options = {}) => {
  console.log(`Seeding ${tableName}...`);

  for (const item of data) {
    const checkColumn = options.checkColumn || "name";
    const hasTimestamps = options.hasTimestamps !== false;

    // Check if record already exists
    const existsQuery = `SELECT id FROM ${tableName} WHERE ${checkColumn} = $1`;
    const existsResult = await queryDB(existsQuery, [item[checkColumn]]);

    if (existsResult.rows.length > 0) {
      console.log(`  - ${item[checkColumn]} already exists in ${tableName}`);
      continue;
    }

    // Insert new record
    const columns = Object.keys(item);
    const values = Object.values(item);

    if (hasTimestamps) {
      columns.push("created_at", "updated_at");
      values.push("NOW()", "NOW()");
    }

    const placeholders = values
      .map((_, index) => {
        if (values[index] === "NOW()") return "NOW()";
        return `$${values.filter((_, i) => i < index && values[i] !== "NOW()").length + 1}`;
      })
      .join(", ");

    const actualValues = values.filter((v) => v !== "NOW()");

    const query = `
      INSERT INTO ${tableName} (${columns.join(", ")})
      VALUES (${placeholders})
      RETURNING id;
    `;

    try {
      const result = await queryDB(query, actualValues);
      if (result.rows.length > 0) {
        console.log(`  ✓ Inserted ${item[checkColumn]} into ${tableName}`);
      }
    } catch (error) {
      console.error(
        `  ✗ Error inserting ${item[checkColumn]} into ${tableName}:`,
        error.message,
      );
    }
  }
};

const seedFareRates = async () => {
  console.log("Seeding fare_rates...");

  const coachTypesResult = await queryDB("SELECT id, name FROM coach_types");
  const seatTypesResult = await queryDB("SELECT id, name FROM seat_types");

  if (coachTypesResult.rows.length === 0 || seatTypesResult.rows.length === 0) {
    console.log("  - Skipping fare_rates (missing coach_types or seat_types)");
    return;
  }

  const fareRates = [];

  for (const coachType of coachTypesResult.rows) {
    for (const seatType of seatTypesResult.rows) {
      let baseRate = 100;

      switch (coachType.name) {
        case "AC 1 Tier":
          baseRate = 500;
          break;
        case "AC 2 Tier":
          baseRate = 350;
          break;
        case "AC 3 Tier":
          baseRate = 250;
          break;
        case "AC Chair Car":
          baseRate = 200;
          break;
        case "Sleeper Class":
          baseRate = 150;
          break;
        case "General":
          baseRate = 50;
          break;
      }

      if (seatType.name === "Lower Berth") {
        baseRate += 50;
      } else if (seatType.name === "Side Lower") {
        baseRate += 30;
      }

      fareRates.push({
        coach_type_id: coachType.id,
        seat_type_id: seatType.id,
        rate_per_km: baseRate / 100,
      });
    }
  }

  for (const fareRate of fareRates) {
    // Check if fare rate already exists
    const existsQuery = `SELECT id FROM fare_rates WHERE coach_type_id = $1 AND seat_type_id = $2`;
    const existsResult = await queryDB(existsQuery, [
      fareRate.coach_type_id,
      fareRate.seat_type_id,
    ]);

    if (existsResult.rows.length > 0) {
      continue;
    }

    const query = `
      INSERT INTO fare_rates (coach_type_id, seat_type_id, rate_per_km, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING id;
    `;

    try {
      const result = await queryDB(query, [
        fareRate.coach_type_id,
        fareRate.seat_type_id,
        fareRate.rate_per_km,
      ]);

      if (result.rows.length > 0) {
        console.log(`  ✓ Inserted fare rate for coach/seat type combination`);
      }
    } catch (error) {
      console.error(`  ✗ Error inserting fare rate:`, error.message);
    }
  }
};

const seedUsers = async () => {
  console.log("Seeding users...");

  const rolesResult = await queryDB("SELECT id, name FROM roles");

  if (rolesResult.rows.length === 0) {
    console.log("  - Skipping users (no roles found)");
    return;
  }

  const adminRole = rolesResult.rows.find((role) => role.name === "admin");
  const customerRole = rolesResult.rows.find(
    (role) => role.name === "customer",
  );

  if (!adminRole || !customerRole) {
    console.log("  - Skipping users (admin or customer role not found)");
    return;
  }

  const users = [
    {
      name: "System Administrator",
      email: "admin@railway.com",
      password_hash:
        "$2b$10$rOvHdS6KMz8UKEZs5B5zeuHhQ8gK9LsZs1xSs8x6PJMwYqP8z9K1e", // password: admin123
      role_id: adminRole.id,
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash:
        "$2b$10$rOvHdS6KMz8UKEZs5B5zeuHhQ8gK9LsZs1xSs8x6PJMwYqP8z9K1e", // password: admin123
      role_id: customerRole.id,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password_hash:
        "$2b$10$rOvHdS6KMz8UKEZs5B5zeuHhQ8gK9LsZs1xSs8x6PJMwYqP8z9K1e", // password: admin123
      role_id: customerRole.id,
    },
  ];

  for (const user of users) {
    // Check if user already exists
    const existsQuery = `SELECT id FROM users WHERE email = $1`;
    const existsResult = await queryDB(existsQuery, [user.email]);

    if (existsResult.rows.length > 0) {
      console.log(`  - User ${user.email} already exists`);
      continue;
    }

    const query = `
      INSERT INTO users (name, email, password_hash, role_id, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id;
    `;

    try {
      const result = await queryDB(query, [
        user.name,
        user.email,
        user.password_hash,
        user.role_id,
      ]);

      if (result.rows.length > 0) {
        console.log(`  ✓ Inserted user ${user.email}`);
      }
    } catch (error) {
      console.error(`  ✗ Error inserting user ${user.email}:`, error.message);
    }
  }
};

export const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...\n");

    await seedTable("roles", seedData.roles);
    await seedTable("coach_types", seedData.coachTypes);
    await seedTable("seat_types", seedData.seatTypes, { hasTimestamps: false });
    await seedTable("booking_statuses", seedData.bookingStatuses);
    await seedTable("payment_statuses", seedData.paymentStatuses);
    await seedTable("refund_statuses", seedData.refundStatuses);
    await seedTable("stations", seedData.stations, { checkColumn: "code" });
    await seedTable("trains", seedData.trains, { checkColumn: "code" });

    await seedFareRates();
    await seedUsers();

    console.log("\n✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("\n❌ Error during database seeding:", error);
    throw error;
  }
};

export default seedDatabase;

