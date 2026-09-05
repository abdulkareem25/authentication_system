import { Router } from "express";
import { 
  registerValidation,
  loginValidation
 } from "../validators/auth.validator.js";
import validateRequest from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { 
  registerUser, 
  loginUser,
  logoutUser,
  refreshToken
} from "../controllers/auth.controller.js";


const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { name: string, email: string, password: string }
 */

router.post(
  '/register',
  registerValidation,
  validateRequest,
  registerUser
)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 * @body { email: string, password: string }
 */

router.post(
  '/login',
  loginValidation,
  validateRequest,
  loginUser
)

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Private
 */

router.post(
  '/logout',
  authMiddleware,
  logoutUser
)

/**
 * @route GET /api/auth/refresh-token
 * @desc Refresh the auth token
 * @access Private
 */

router.get(
  '/refresh-token',
  authMiddleware,
  refreshToken
)

export default router;