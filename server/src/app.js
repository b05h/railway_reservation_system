import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  authRoutes,
  trainRoutes,
  stationRoutes,
  stationDistanceRoutes,
  scheduleRoutes,
  auditLogRoutes,
  coachTypeRoutes,
} from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import responseTransformer from "./middleware/responseTransformer.js";

export default function createApp(config) {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  // register response transformer middleware
  app.use(responseTransformer);

  const api = express.Router();

  api.use("/auth", authRoutes);
  api.use("/admin", trainRoutes);
  api.use("/admin", stationRoutes);
  api.use("/admin", stationDistanceRoutes);
  api.use("/admin/audit-log", auditLogRoutes);
  api.use("/admin/coach-types", coachTypeRoutes);
  api.use("/admin/schedules", scheduleRoutes);

  api.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api/v1", api);

  // register global error handler middleware
  app.use(errorHandler);

  return app;
}
