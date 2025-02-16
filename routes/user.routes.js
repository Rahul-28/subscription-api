import { Router } from "express";

import authorize from "../middlewares/auth.middleware.js";

import {
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id", authorize, updateUser);

export default userRouter;
