import { Router } from "express";
import { registerValidation } from "../validators/auth.validator.js";

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

export default router;