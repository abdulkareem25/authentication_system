import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  // Create a new user
  const newUser = new User({ name, email, password });
  await newUser.save();

  res.status(201).json({
    success: true,
    message: "User registered successfully"
  });
})

export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // Check if password is correct
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error = new Error("Invalid password");
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token
  });
})