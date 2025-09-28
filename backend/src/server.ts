// backend/src/server.ts

import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // --- ADDED: For future features like refresh tokens
import AppError from "./utils/AppError";
import apiRouter from "./routes";

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000; // --- Adjusted Port to 8000 to match our test files ---

// --- Middlewares ---
app.use(cors({ origin: process.env.CLIENT_URL || "*" })); // --- Adjusted CORS for easier development
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser()); // --- ADDED: Cookie parser middleware

// --- API Routes ---
// This is now safe to re-enable and will correctly route to our auth and user endpoints
app.use("/api/v1", apiRouter);

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("DevBot Server is running!");
});

// --- ERROR HANDLING ---

// THIS IS THE CORRECTED 404 HANDLER.
// It comes after all valid routes. If a request reaches this point,
// it means no other route has handled it, so it must be a 404.
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// THIS IS THE GLOBAL ERROR HANDLING MIDDLEWARE.
// Express recognizes it as an error handler because it has 4 arguments.
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// --- Start Server ---
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
