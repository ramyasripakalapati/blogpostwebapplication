const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Register User
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Login User
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY, // Ensure correct key is used
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,  // Send the JWT token in the response
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Get All Users (for testing or admin purposes)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
