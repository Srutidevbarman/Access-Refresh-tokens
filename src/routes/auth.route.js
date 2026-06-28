import { Router } from "express";
import {
  generateAccessToken,
  loginController,
  registerController,
} from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/access-token", generateAccessToken);

export default authRouter;
