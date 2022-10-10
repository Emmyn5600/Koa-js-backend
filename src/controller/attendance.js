import dotenv from "dotenv";
import model from "../database/models";

const User = model.User;
const Attendance = model.Attendance;

dotenv.config();

export const createAttendance = async (ctx, next) => {
  try {
    const userId = ctx.params.id;
    const user = await User.findOne({ where: { id: userId } });
    const { attendanceDate, attendanceEntranceTime } = ctx.request.body;

    if (!user || !attendanceDate || !attendanceEntranceTime) {
      ctx.status = 400;
      ctx.body = {
        status: "fail",
        message: "Invalid request, Provide valid information",
      };
    }

    const newAttendance = await Attendance.create({
      userId,
      attendanceDate,
      attendanceEntranceTime,
    });
    ctx.status = 201;
    ctx.body = {
      newAttendance,
      message: "Attendance created successfully",
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

export const updateAttendance = async (ctx, next) => {
  const { attendanceExitTime } = ctx.request.body;
  try {
    const userId = ctx.params.id;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      ctx.status = 404;
      ctx.body = {
        message: "User with this id not found",
      };
    }

    const attendanceupdate = await Attendance.update(
      {
        attendanceExitTime,
      },
      { where: { userId } }
    );
    ctx.status = 200;
    ctx.body = {
      message: "user updated successfully",
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Internal sever error",
      err: error.message,
    };
  }
};
