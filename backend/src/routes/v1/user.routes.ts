// backend/src/routes/v1/user.routes.ts

import express from "express";
import { getMe } from "../../controllers/userController";
import { protect } from "../../middleware/auth.middleware";

const router = express.Router();

// Any route defined here is prefixed with /api/v1/users

// Applying the 'protect' middleware to this route.
// The request will first go through 'protect', and only if it succeeds
// will it proceed to the 'getMe' controller.
router.route("/me").get(protect, getMe);

export default router;
