import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { checkBlacklistedToken } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", checkBlacklistedToken, signOut);

export default authRouter;
