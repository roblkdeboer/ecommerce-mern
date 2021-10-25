import asyncHandler from 'express-async-handler';
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
      token: null,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { authUser };
