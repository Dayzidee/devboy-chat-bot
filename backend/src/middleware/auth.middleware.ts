// backend/src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/AppError';

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Unauthorized, no token provided.', 401));
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return next(new AppError('Unauthorized, token failed.', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Unauthorized, token failed.', 401));
  }
});

export { protect };