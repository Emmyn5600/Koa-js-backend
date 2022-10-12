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

    toJSON() {
      return {
        ...this.get(),
        role: undefined,
        password: undefined,
      };
    }
  }
  Attendance.init(
    {
      userId: DataTypes.INTEGER,
      attendanceDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      attendanceEntranceTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      attendanceExitTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
