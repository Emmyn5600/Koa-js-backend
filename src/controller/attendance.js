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
    if (!user) {
      ctx.status = 400;
      ctx.body = {
        status: "fail",
        message: "User with this id is not found",
      };
    } else {
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
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "Fail",
      message: "Error while updating a Attendance",
      err: error.message,
    };
  }
};

export const getAllAttendances = async (ctx, next) => {
  try {
    const allAttendances = await Attendance.findAll({ include: "user" });
    ctx.status = 200;
    ctx.body = {
      allAttendances,
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

export const getAttendance = async (ctx, next) => {
  const attendanceId = ctx.params.id;
  try {
    const attendance = await Attendance.findOne({
      where: { id: attendanceId },
      include: ["user"],
    });
    if (!attendance) {
      ctx.status = 404;
      ctx.body = {
        message: "attendance with this id not found",
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        attendance,
        message: "OK, attendance with this id is found",
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Internal sever error",
    };
  }
};

export const updateUserAttendance = async (ctx, next) => {
  const { attendanceExitTime } = ctx.request.body;
  const userId = ctx.params.id;
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    ctx.status = 404;
    ctx.body = {
      message: "User with this id not found",
    };
  } else {
    await Attendance.update(
      {
        attendanceExitTime,
      },
      {
        where: { userId },
      }
    );
    ctx.status = 200;
    ctx.body = {
      message: "Attendance updated successfully",
    };
  }
};

export const updateAttendanceForUsers = async (ctx, next) => {
  const { attendanceDate, attendanceEntranceTime, attendanceExitTime } =
    ctx.request.body;
  const userId = ctx.params.id;
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    ctx.status = 404;
    ctx.body = {
      message: "User with this id not found",
    };
  } else {
    await Attendance.update(
      {
        attendanceDate,
        attendanceEntranceTime,
        attendanceExitTime,
      },
      {
        where: { userId },
      }
    );
    ctx.status = 200;
    ctx.body = {
      message: "Attendance updated successfully",
    };
  }
};

export const deleteAttendance = async (ctx, next) => {
  const userId = ctx.params.id;
  try {
    const userattendance = await Attendance.destroy({
      where: { id: userId },
      include: ["user"],
    });
    if (!userattendance) {
      ctx.status = 404;
      ctx.body = {
        message: "User with this id not found",
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        message: "OK, Attendance has been deleted successfully",
      };
    }
  } catch (error) {
    ctx.status = 500;
    console.error(error);
    ctx.body = {
      message: "Internal sever error",
    };
  }
};
