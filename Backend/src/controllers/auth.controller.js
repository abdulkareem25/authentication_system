import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import {
  refereshTokenGenerator,
  authTokenGenerator,
} from "../utils/tokenGenerator.js";

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
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  // Check if password is correct
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const refereshToken = refereshTokenGenerator(user._id);
  const authToken = authTokenGenerator(user._id);

  // Store the refresh token in the database
  user.refereshToken = refereshToken;
  await user.save();

  // Send the auth token in cookie
  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
  });
})

export const logoutUser = asyncHandler(async (req, res) => {
  
  // Clear the auth token cookie
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: "strict",
  });

  // Clear the refresh token from the database
  req.user.refereshToken = null;
  await req.user.save();
  
  res.status(200).json({
    success: true,
    message: "User logged out successfully"
  })
})

export const refreshToken = asyncHandler(async (req, res) => {

  const { user } = req;

  if (!user) {
    const error = new Error("User not authenticated");
    error.statusCode = 401;
    throw error;
  }

  // Generate a new auth token
  const authToken = authTokenGenerator(user._id);

  // Send the new auth token in cookie
  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  const refereshToken = refereshTokenGenerator(user._id);

  // Update the refresh token in the database
  user.refereshToken = refereshToken;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Auth token refreshed successfully"
  });
})