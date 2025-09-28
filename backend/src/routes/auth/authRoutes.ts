// backend/src/routes/auth/authRoutes.ts

import { Router } from "express";
// Import both controllers
import { register, login } from "../../controllers/authController";
import {
  registerValidationRules,
  loginValidationRules,
  validate,
} from "../../middleware/validators";

const router = Router();

// POST /api/v1/auth/register
// 2. Add the validation rules and the handler to the route
router.post("/register", registerValidationRules(), validate, register);

// POST /api/v1/auth/login
// 3. Add validation for the login route as well
router.post("/login", loginValidationRules(), validate, login);

export default router;
