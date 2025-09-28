// backend/src/services/authService.ts

import bcrypt from "bcryptjs";
import User, { UserDocument } from "../models/User"; // Corrected import path
import AppError from "../utils/AppError";
import { generateToken } from "../utils/token";

// --- TYPE DEFINITIONS ---
type RegisterUserData = { username: string; email: string; password: string };
type LoginUserData = { email: string; password: string };

// This is the sanitized user object type we want to expose to the client.
type SanitizedUser = Omit<UserDocument, "passwordHash" | "comparePassword">;

// --- REFACTOR GOAL 1: Create ONE consistent return type for both functions. ---
// This new interface is the key to solving the problem. It ensures both
// register and login functions return an object with the exact same properties.
export interface AuthServiceResponse {
  user: SanitizedUser;
  accessToken: string;
}

// --- REGISTRATION SERVICE ---
/**
 * Registers a new user, hashes their password, and immediately logs them in.
 * @param userData - The user's registration details.
 * @returns A promise that resolves to the new user and an accessToken.
 */
// --- REFACTOR GOAL 2: Update the return type to use our new consistent interface. ---
export const registerUser = async (
  userData: RegisterUserData
): Promise<AuthServiceResponse> => {
  const { username, email, password } = userData;

  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    throw new AppError(
      "An account with this email address already exists.",
      409
    );
  }
  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    throw new AppError(
      "This username is already taken. Please choose another one.",
      409
    );
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    passwordHash: passwordHash,
  });

  // --- REFACTOR GOAL 3: Generate a token immediately upon registration. ---
  // This provides a better user experience, as the user is logged in automatically.
  const accessToken = generateToken(newUser._id);

  // Convert the Mongoose document to a plain object for the response.
  const sanitizedUser = newUser.toJSON() as SanitizedUser;

  // --- REFACTOR GOAL 4: Return the object that matches our AuthServiceResponse interface. ---
  return { user: sanitizedUser, accessToken };
};

// --- LOGIN SERVICE ---
/**
 * Authenticates a user and provides an access token.
 * @param userData - The user's login details.
 * @returns A promise that resolves to the authenticated user and an accessToken.
 */
// --- REFACTOR GOAL 5: Update the login function to also use the consistent interface. ---
export const loginUser = async (
  userData: LoginUserData
): Promise<AuthServiceResponse> => {
  const { email, password } = userData;

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError(
      "Invalid credentials. Please check your email and password.",
      401
    );
  }

  // --- REFACTOR GOAL 6: Rename 'token' to 'accessToken' for consistency. ---
  const accessToken = generateToken(user._id);
  const sanitizedUser = user.toJSON() as SanitizedUser;

  // Return the object that matches our AuthServiceResponse interface.
  return { user: sanitizedUser, accessToken };
};
