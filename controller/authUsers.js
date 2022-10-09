import dotenv from "dotenv";
import model from "../database/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const User = model.User;

export const signup = async (ctx, next) => {
  try {
    const { username, email, password, position, age, role } = ctx.request.body;
    if (!username || !email || !position || !password || !age) {
      ctx.status = 400;
      ctx.body = {
        status: "fail",
        message: "Invalid request, Provide valid information",
      };
    }

    const user = await User.findOne({ where: { email } });

    if (user) {
      ctx.status = 403;
      ctx.body = {
        status: "Forbidden",
        message: "Email already exist",
      };
      return;
    }

    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 12),
      position,
      age,
      role,
    });
    ctx.status = 201;
    ctx.body = {
      newUser,
      message: "User created successfully",
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "Fail",
      message: "Error while creating a user",
      err: error.message,
    };
  }
};

export const signin = async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body;
    if (!email || !password) {
      ctx.status = 400;
      ctx.body = {
        status: "fail",
        message: "Invalid data credentials",
      };
    }

    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      user.token = token;

      ctx.status = 200;
      ctx.body = {
        status: "Success",
        message: "User signs in successfully",
        data: {
          user,
          token: token,
        },
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        status: "fail",
        message: "Invalid email or password",
      };
    }
  } catch (error) {
    ctx.status = 403;
    ctx.body = {
      status: "Fail",
      message: "Error while signing a user",
      err: error.message,
    };
  }
};
