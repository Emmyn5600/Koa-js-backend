import koa from "koa";
import bodyparser from "koa-bodyparser";
import koaRouter from "koa-router";
import cors from "@koa/cors";
import json from "koa-json";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./controller/users";

import { createAttendance, updateAttendance } from "./controller/attendance";
import { signup, signin } from "./controller/authUsers";

import { protect, restrictRoleTo } from "./middleware/authAdmin";

const app = new koa();
const router = new koaRouter();

app.use(json());

app.use(bodyparser());

app.use(cors());

//Set proper Headers on Backend
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  await next();
});

//setting the router middleware
app.use(router.routes()).use(router.allowedMethods());
router
  .get("/users", getAllUsers)
  .get("/users/:id", getUser)
  .put("/users/:id", protect, restrictRoleTo("admin"), updateUser)
  .delete("/users/:id", protect, restrictRoleTo("admin"), deleteUser)
  .post("/signup", signup)
  .post("/signin", signin)
  .post("/createAttendance/:id", createAttendance)
  .put("/updateAttendance/:id", updateAttendance);

export default app;
