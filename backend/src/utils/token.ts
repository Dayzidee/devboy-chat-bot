// backend/src/utils/token.ts

import jwt from "jsonwebtoken";
import { Types } from "mongoose";

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 * @param id - The user's MongoDB ObjectId.
 * @returns The generated JWT string.
 */
export const generateToken = (id: Types.ObjectId): string => {
  const jwtSecret = process.env.JWT_SECRET;

  // This is the value from our .env file, e.g., "7d"
  const jwtExpire = process.env.JWT_EXPIRE;

  if (!jwtSecret || !jwtExpire) {
    console.error(
      "FATAL ERROR: JWT_SECRET or JWT_EXPIRE is not defined in .env file"
    );
    process.exit(1);
  }

  // The 'as any' cast here tells TypeScript to ignore the strict type
  // mismatch for this specific, known-good case. It's a pragmatic solution
  // for a known issue with the @types/jsonwebtoken library.
  const options: jwt.SignOptions = {
    expiresIn: jwtExpire as any,
  };

  return jwt.sign({ id: id.toString() }, jwtSecret, options);
};
