// backend/src/controllers/authController.ts

import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";
import { ApiResponse } from "../utils/ApiResponse";
import AppError from "../utils/AppError"; // Import our custom error class

// Your catchAsync utility is great, we will keep it.
const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    // Instead of manually sending an error, we throw one for our global handler.
    if (!username || !email || !password) {
      // This will be caught by `catchAsync` and passed to the global error handler.
      return next(
        new AppError("Please provide username, email, and password", 400)
      );
    }

    // Our service correctly returns both user and accessToken.
    const { user, accessToken } = await registerUser({
      username,
      email,
      password,
    });

    // Use the standardized ApiResponse for a consistent API.
    const responseData = { user, accessToken };
    return res
      .status(201)
      .json(new ApiResponse(201, responseData, "User registered successfully"));
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    // Our service returns the token, which we'll name accessToken for consistency.
    const { user, token: accessToken } = await loginUser({ email, password });

    // --- THIS IS THE KEY FIX ---
    // We now nest the accessToken inside the 'data' object using ApiResponse.
    // This makes the response structure identical to the register response.
    const responseData = { user, accessToken };
    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "User logged in successfully"));
  }
);
