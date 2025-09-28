// backend/src/controllers/authController.ts

import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { ApiResponse } from '../utils/ApiResponse';
import AppError from '../utils/AppError';

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new AppError('Please provide username, email, and password', 400));
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    return next(new AppError(error.message, error.status || 500));
  }

  if (!data.session) {
    return res.status(201).json(new ApiResponse(201, { user: data.user }, 'User registered successfully. Please check your email to verify your account.'));
  }

  const responseData = { user: data.user, accessToken: data.session.access_token };
  return res.status(201).json(new ApiResponse(201, responseData, 'User registered successfully'));
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return next(new AppError(error.message, error.status || 500));
  }

  const responseData = { user: data.user, accessToken: data.session.access_token };
  return res.status(200).json(new ApiResponse(200, responseData, 'User logged in successfully'));
});