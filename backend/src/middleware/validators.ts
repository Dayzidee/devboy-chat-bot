// File: /backend/src/middleware/validators.ts

import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// --- Validation Rules for Registration ---
export const registerValidationRules = () => {
  return [
    // Username must not be empty and have a min length of 3
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required.")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),

    // Email must be a valid email format
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email address."),

    // Password must be at least 8 characters long
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
  ];
};

// --- Validation Rules for Login ---
export const loginValidationRules = () => {
  return [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("password").notEmpty().withMessage("Password is required."),
  ];
};

// --- Middleware to Handle Validation Errors ---
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // No errors, proceed to the controller
  }

  // Extract error messages
  const extractedErrors: { [key: string]: string } = {};
  errors.array().forEach((err) => {
    if ("path" in err) {
      extractedErrors[err.path] = err.msg;
    }
  });

  // Return a 422 Unprocessable Entity response
  return res.status(422).json({
    status: "fail",
    message: "Input validation failed",
    errors: extractedErrors,
  });
};
