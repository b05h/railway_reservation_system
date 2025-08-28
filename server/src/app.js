import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/index.js";

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

  const api = express.Router();

  api.use("/auth", authRoutes);
  api.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api/v1", api);

  return app;
}
