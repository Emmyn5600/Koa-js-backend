import dotenv from "dotenv";

dotenv.config();

module.exports = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    port: process.env.PORT,
    hashPassNum: process.env.HASH_PASSWORD_SALT,
  },
  test: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.TEST_URL,
    dialect: "postgres",
    port: process.env.PORT,
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.PROD_URL,
    dialect: "postgres",
    port: process.env.PORT,
  },
};
