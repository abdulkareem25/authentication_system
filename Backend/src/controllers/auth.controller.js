const registerUser = async (req, res) => {

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
};