"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Attendance }) {
      this.hasMany(Attendance, { foreignKey: "userId", as: "Attends" });
    }

    toJSON() {
      return {
        ...this.get(),
        // role: undefined,
        password: undefined,
      };
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING,
      position: DataTypes.STRING,
      age: DataTypes.INTEGER,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
