import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc Authenticate a user and send back a token
// @route POST /api/users/login
// @access Public
// Use async function as mongoose returns a promise
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   Find one user where the email entered matches the email in the database
  const user = await User.findOne({ email });

  //   Match plain text password with encrypted password, if user matches and password matches then return user info, if not, return error
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Create a new user
// @route POST /api/users
// @access Public
// Use w function as mongoose returns a promise
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //   Find one user where the email entered matches the email in the database
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
// Use async function as mongoose returns a promise
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
// Use async function as mongoose returns a promise
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // If a field is sent in the body, change to that, if not, keep the same
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // New password will be hashed and salted because of the save middleware in userModel
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
// Use async function as mongoose returns a promise
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.json(users);
});

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers };
