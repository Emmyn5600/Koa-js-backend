// import koaRouter from "koa-router";
// import {
//   getAllUsers,
//   getUser,
//   updateUser,
//   deleteUser,
// } from "../controller/users";

// import { signup, signin } from "../controller/authUsers";

// import { protect, restrictRoleTo } from "../middleware/authAdmin";

// const router = new koaRouter();

// router
//   .get("/users", getAllUsers)
//   .get("/users/:id", protect, restrictRoleTo("admin"), getUser)
//   .put("/users/:id", protect, restrictRoleTo("admin"), updateUser)
//   .delete("/users/:id", protect, restrictRoleTo("admin"), deleteUser)
//   .post("/signup", signup)
//   .post("/signin", signin);

// export default router;
