import dotenv from "dotenv";
import model from "../database/models";

const User = model.User;

dotenv.config();

export const getAllUsers = async (ctx, next) => {
  try {
    const allUsers = await User.findAll({ include: "Attends" });
    ctx.status = 200;
    ctx.body = {
      allUsers,
      message: "OK, All users has been listed",
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Internal sever error",
      err: error.stack,
    };
  }
};

export const getUser = async (ctx, next) => {
  const userId = ctx.params.id;
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: ["Attends"],
    });
    if (!user) {
      ctx.status = 404;
      ctx.body = {
        message: "User with this id not found",
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        user,
        message: "OK, User with this id is found",
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Internal sever error",
    };
  }
};

export const updateUser = async (ctx, next) => {
  const { username, email, password, position, age, role } = ctx.request.body;
  const userId = ctx.params.id;
  try {
    const userupdate = await User.findOne({
      where: { id: userId },
    });
    if (!userupdate) {
      ctx.status = 404;
      ctx.body = {
        message: "User with this id not found",
      };
    } else {
      await User.update(
        {
          username,
          email,
          password,
          position,
          age,
          role,
        },
        {
          where: { id: userId },
        }
      );
      ctx.status = 200;
      ctx.body = {
        message: "user updated successfully",
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Internal sever error",
      err: error.message,
    };
  }
};

export const deleteUser = async (ctx, next) => {
  const userId = ctx.params.id;
  try {
    const userdelete = await User.destroy({
      where: { id: userId },
      include: ["Attends"],
    });
    if (!userdelete) {
      ctx.status = 404;
      ctx.body = {
        message: "User with this id not found",
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        message: "OK, User has been deleted successfully",
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Internal sever error",
    };
  }
};
