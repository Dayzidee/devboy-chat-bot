// backend/src/controllers/userController.ts

import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { ApiResponse } from '../utils/ApiResponse';
import AppError from '../utils/AppError';
import asyncHandler from 'express-async-handler';

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/users/me
 * @access  Private
 */
const getMe = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return next(new AppError('User not found.', 404));
  }

  // Fetch the user's public profile from the `users` table
  const { data: userProfile, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    return next(new AppError('User profile not found.', 404));
  }

  res.status(200).json(new ApiResponse(200, userProfile, 'User profile fetched successfully'));
});

export { getMe };