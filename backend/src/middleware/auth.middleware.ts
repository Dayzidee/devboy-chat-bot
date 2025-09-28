// backend/src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import { ApiError } from "../utils/ApiError"; // This path should now be valid
import { UserDocument } from "../models/User";
import AppError from "../utils/AppError";

interface JwtPayload {
  id: string;
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;

        const currentUser = await User.findById(decoded.id).select(
          "-passwordHash"
        );

        if (!currentUser) {
          // UPDATED: Using AppError
          return next(
            new AppError(
              "The user belonging to this token no longer exists.",
              401
            )
          );
        }

        if (!currentUser) {
          throw new ApiError(
            401,
            "Unauthorized, the user belonging to this token no longer exists."
          );
        }

        req.user = currentUser as UserDocument;
        next();
      } catch (error) {
        console.error("Authentication Error:", error);
        throw new ApiError(401, "Unauthorized, token failed.");
      }
    }

    

    if (!token) {
      throw new ApiError(401, "Unauthorized, no token provided.");
    }
  }
);

export { protect };
