"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
  }
  Attendance.init(
    {
      userId: DataTypes.INTEGER,
      attendanceDate: DataTypes.DATE,
      attendanceEntranceTime: DataTypes.TIME,
      attendanceExitTime: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
