// backend/src/controllers/userController.ts

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse";

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/users/me
 * @access  Private
 */
const getMe = asyncHandler(async (req: Request, res: Response) => {
  // The `protect` middleware has already fetched the user and attached it to req.user.
  // We just need to send it back in the response.
  const user = req.user;

  res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export { getMe };
