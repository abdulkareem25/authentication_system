// src/routes/dashboard.route.js
import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import dashboardController from "../controllers/dashboard.controller.js";

const router = Router();

router.get(
  "/", 
  authMiddleware,
  dashboardController
);

export default router;