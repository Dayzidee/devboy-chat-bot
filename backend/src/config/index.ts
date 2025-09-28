// File: /backend/src/config/index.ts

import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Define a configuration object
const config = {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongodb_uri: process.env.MONGODB_URI,
};

// Validate that all necessary environment variables are set
if (!config.mongodb_uri) {
  console.error("FATAL ERROR: MONGODB_URI is not defined.");
  process.exit(1);
}

// Freeze the object to prevent modifications
export default Object.freeze(config);
