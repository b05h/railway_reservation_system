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
  const trainsResult = await queryDB("SELECT id, name FROM trains");

  if (coachTypesResult.rows.length === 0 || trainsResult.rows.length === 0) {
    console.log("  - Skipping fare_rates (missing coach_types or trains)");
    return;
  }

  const fareRates = [];

  for (const train of trainsResult.rows) {
    for (const coachType of coachTypesResult.rows) {
      let ratePerKm = 1.0;

      switch (coachType.name) {
        case "AC 1 Tier":
          ratePerKm = 5.0;
          break;
        case "AC 2 Tier":
          ratePerKm = 3.5;
          break;
        case "AC 3 Tier":
          ratePerKm = 2.5;
          break;
        case "AC Chair Car":
          ratePerKm = 2.0;
          break;
        case "Sleeper Class":
          ratePerKm = 1.5;
          break;
        case "General":
          ratePerKm = 0.5;
          break;
      }

      fareRates.push({
        train_id: train.id,
        coach_type_id: coachType.id,
        rate_per_km: ratePerKm,
      });
    }
  }

  for (const fareRate of fareRates) {
    // Check if fare rate already exists
    const existsQuery = `SELECT id FROM fare_rates WHERE train_id = $1 AND coach_type_id = $2`;
    const existsResult = await queryDB(existsQuery, [
      fareRate.train_id,
      fareRate.coach_type_id,
    ]);

    if (existsResult.rows.length > 0) {
      continue;
    }

    const query = `
      INSERT INTO fare_rates (train_id, coach_type_id, rate_per_km, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING id;
    `;

    try {
      const result = await queryDB(query, [
        fareRate.train_id,
        fareRate.coach_type_id,
        fareRate.rate_per_km,
      ]);

      if (result.rows.length > 0) {
        console.log(`  ✓ Inserted fare rate for train/coach type combination`);
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
        "$2a$12$aaAzwXNi593UQjovDY8xsOSAvO.Xq7aFlBt9lpd3Yf2FwgTQTkWlG", // password: admin123
      role_id: adminRole.id,
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash:
        "$2b$10$anVmjcJPR9v.jMwJRUvbx.KxGbfpC5XJuVCezCvc0a006249AlxN6", // password: password
      role_id: customerRole.id,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password_hash:
        "$2b$10$anVmjcJPR9v.jMwJRUvbx.KxGbfpC5XJuVCezCvc0a006249AlxN6", // password: password
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

const seedSchedules = async () => {
  console.log("Seeding schedules...");

  const trainsResult = await queryDB("SELECT id, name, code FROM trains");

  if (trainsResult.rows.length === 0) {
    console.log("  - Skipping schedules (no trains found)");
    return;
  }

  const schedules = [
    {
      train_id: trainsResult.rows[0].id, // Rajdhani Express
      departure_date: "2025-01-15",
      departure_time: "16:55:00",
    },
    {
      train_id: trainsResult.rows[1].id, // Shatabdi Express
      departure_date: "2025-01-15",
      departure_time: "06:00:00",
    },
    {
      train_id: trainsResult.rows[2].id, // Duronto Express
      departure_date: "2025-01-16",
      departure_time: "22:30:00",
    },
    {
      train_id: trainsResult.rows[3].id, // Garib Rath
      departure_date: "2025-01-16",
      departure_time: "23:45:00",
    },
    {
      train_id: trainsResult.rows[4].id, // Jan Shatabdi
      departure_date: "2025-01-17",
      departure_time: "05:30:00",
    },
  ];

  const insertedSchedules = [];

  for (const schedule of schedules) {
    // Check if schedule already exists
    const existsQuery = `SELECT id FROM schedules WHERE train_id = $1 AND departure_date = $2 AND departure_time = $3`;
    const existsResult = await queryDB(existsQuery, [
      schedule.train_id,
      schedule.departure_date,
      schedule.departure_time,
    ]);

    if (existsResult.rows.length > 0) {
      console.log(
        `  - Schedule for train already exists for ${schedule.departure_date}`,
      );
      insertedSchedules.push(existsResult.rows[0]);
      continue;
    }

    const query = `
      INSERT INTO schedules (train_id, departure_date, departure_time, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING id, train_id, departure_date;
    `;

    try {
      const result = await queryDB(query, [
        schedule.train_id,
        schedule.departure_date,
        schedule.departure_time,
      ]);

      if (result.rows.length > 0) {
        console.log(`  ✓ Inserted schedule for ${schedule.departure_date}`);
        insertedSchedules.push(result.rows[0]);
      }
    } catch (error) {
      console.error(`  ✗ Error inserting schedule:`, error.message);
    }
  }

  return insertedSchedules;
};

const seedScheduleStops = async () => {
  console.log("Seeding schedule_stops...");

  const schedulesResult = await queryDB("SELECT id, train_id FROM schedules");
  const stationsResult = await queryDB("SELECT id, name, code FROM stations");

  if (schedulesResult.rows.length === 0 || stationsResult.rows.length === 0) {
    console.log("  - Skipping schedule_stops (missing schedules or stations)");
    return;
  }

  // Define route stops for different trains
  const routeDefinitions = [
    {
      // Rajdhani Express: New Delhi -> Mumbai Central
      stations: ["NDLS", "JP", "ADI", "BCT"],
      times: [
        { arrival: "16:55:00", departure: "16:55:00" }, // Start station
        { arrival: "21:30:00", departure: "21:40:00" }, // Jaipur
        { arrival: "05:15:00", departure: "05:25:00" }, // Ahmedabad
        { arrival: "12:30:00", departure: "12:30:00" }, // End station
      ],
    },
    {
      // Shatabdi Express: New Delhi -> Jaipur
      stations: ["NDLS", "JP"],
      times: [
        { arrival: "06:00:00", departure: "06:00:00" }, // Start station
        { arrival: "10:45:00", departure: "10:45:00" }, // End station
      ],
    },
    {
      // Duronto Express: Mumbai Central -> Howrah
      stations: ["BCT", "PUNE", "SC", "HWH"],
      times: [
        { arrival: "22:30:00", departure: "22:30:00" }, // Start station
        { arrival: "01:15:00", departure: "01:25:00" }, // Pune
        { arrival: "14:20:00", departure: "14:30:00" }, // Secunderabad
        { arrival: "06:45:00", departure: "06:45:00" }, // End station
      ],
    },
    {
      // Garib Rath: New Delhi -> Chennai Central
      stations: ["NDLS", "SC", "MAS"],
      times: [
        { arrival: "23:45:00", departure: "23:45:00" }, // Start station
        { arrival: "20:30:00", departure: "20:40:00" }, // Secunderabad
        { arrival: "06:15:00", departure: "06:15:00" }, // End station
      ],
    },
    {
      // Jan Shatabdi: New Delhi -> Lucknow
      stations: ["NDLS", "LKO"],
      times: [
        { arrival: "05:30:00", departure: "05:30:00" }, // Start station
        { arrival: "11:45:00", departure: "11:45:00" }, // End station
      ],
    },
  ];

  for (
    let scheduleIndex = 0;
    scheduleIndex <
    Math.min(schedulesResult.rows.length, routeDefinitions.length);
    scheduleIndex++
  ) {
    const schedule = schedulesResult.rows[scheduleIndex];
    const route = routeDefinitions[scheduleIndex];

    for (let stopIndex = 0; stopIndex < route.stations.length; stopIndex++) {
      const stationCode = route.stations[stopIndex];
      const timeInfo = route.times[stopIndex];

      const station = stationsResult.rows.find((s) => s.code === stationCode);
      if (!station) {
        console.log(`  - Station ${stationCode} not found, skipping`);
        continue;
      }

      // Check if schedule stop already exists
      const existsQuery = `SELECT id FROM schedule_stops WHERE schedule_id = $1 AND station_id = $2 AND stop_number = $3`;
      const existsResult = await queryDB(existsQuery, [
        schedule.id,
        station.id,
        stopIndex + 1,
      ]);

      if (existsResult.rows.length > 0) {
        console.log(
          `  - Schedule stop ${stopIndex + 1} for ${station.name} already exists`,
        );
        continue;
      }

      const query = `
        INSERT INTO schedule_stops (schedule_id, station_id, stop_number, arrival_time, departure_time, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        RETURNING id;
      `;

      try {
        const result = await queryDB(query, [
          schedule.id,
          station.id,
          stopIndex + 1,
          timeInfo.arrival,
          timeInfo.departure,
        ]);

        if (result.rows.length > 0) {
          console.log(
            `  ✓ Inserted schedule stop ${stopIndex + 1} for ${station.name}`,
          );
        }
      } catch (error) {
        console.error(
          `  ✗ Error inserting schedule stop for ${station.name}:`,
          error.message,
        );
      }
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
    await seedSchedules();
    await seedScheduleStops();

    console.log("\n✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("\n❌ Error during database seeding:", error);
    throw error;
  }
};

export default seedDatabase;
