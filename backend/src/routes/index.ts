// backend/src/routes/index.ts

import { Router } from "express";
import authRoutes from "./auth/authRoutes";
import userRoutes from './v1/user.routes';
// Future routes will be imported here
// import userRoutes from './users/userRoutes';

const router = Router();

// All auth routes will be prefixed with /auth
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

// Future routes will be mounted here
// router.use('/users', userRoutes);

export default router;
