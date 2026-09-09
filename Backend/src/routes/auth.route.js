import { Router } from "express";
import { 
  registerValidation,
  loginValidation
 } from "../validators/auth.validator.js";
import validateRequest from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { 
  register, 
  login,
  logout,
  refreshToken,
  getMe
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
  register
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
  login
)

/**
 * @route GET /api/auth/me
 * @desc Get the current logged-in user
 * @access Private
 */

router.get(
  '/me',
  authMiddleware,
  getMe
)

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Private
 */

router.post(
  '/logout',
  authMiddleware,
  logout
)

/**
 * @route POST /api/auth/refresh-token
 * @desc Refresh the auth token
 * @access Private
 */

router.post(
  '/refresh-token',
  refreshToken
)

export default router;