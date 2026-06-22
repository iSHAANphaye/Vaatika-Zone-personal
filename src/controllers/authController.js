import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to sign JWT tokens
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// Helper to format user response and exclude sensitive fields
const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user,
    },
  });
};

/**
 * Register a new User
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    // 2. Create user (pre-save middleware in User.js will hash the password)
    const user = await User.create({
      name,
      email,
      password,
      role: 'customer',
    });

    // 3. Send response with JWT
    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

/**
 * User Login
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect email or password',
      });
    }

    // 3. Verify password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect email or password',
      });
    }

    // 4. Send response with JWT
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};
