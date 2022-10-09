"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Users", [
      {
        username: "emmyn5600",
        email: "admin123@gmail.com",
        password: await bcrypt.hash(
          process.env.ADMIN_PASSWORD,
          Number(process.env.HASH_PASSWORD_SALT)
        ),
        position: "Python developer",
        age: 20,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
