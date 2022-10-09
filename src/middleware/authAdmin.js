import model from "../database/models";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import dotenv from "dotenv";

/**
 * Get User model
 */

const User = model.User;

dotenv.config();

/**
 * This middleware  ensures that the user is logged in
 */

export const protect = async (ctx, next) => {
  let token;

  /**
   * Get token sent along with the request
   * Check if headers.authorization has a token
   * The token should starts with a Bearer keyword
   */

  if (ctx.headers.authorization.startsWith("Bearer")) {
    token = ctx.headers.authorization.split(" ")[1];
  }

  /**
   * Send a generic message if no token found
   */

  if (!token) {
    ctx.status = 401;
    ctx.body = {
      status: "unauthorized",
      message: "unauthorized user, You are not allowed to perform this action",
    };
  }

  /**
   * Token verification and decoding
   * Get user info from the token
   */

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user_email = decoded.email;

  /**
   * Check if the user is who he claimed to be
   * Using id decoded from the token to find user from database
   */

  const freshUser = await User.findOne({ where: { email: user_email } });
  /**
   * Send error message if no user found with ID decoded from token
   */

  if (!freshUser) {
    ctx.status = 401;
    ctx.body = {
      status: "unauthorized",
      message: "User belonging to this token doesn't exist",
    };
  }

  /**
   * Send entire user object to the request if successfully found
   */

  ctx.user = freshUser;

  next();
};

/**
 * This middleware ensures that the user has ability to access a certain resource
 */

export const restrictRoleTo = (...roles) => {
  return async (ctx, next) => {
    if (!roles.includes(ctx.user.role)) {
      ctx.status = 403;
      ctx.body = {
        message: "You are not permitted to perform this action",
      };
    }
    await next();
  };
};
