import { Router } from "express";
import {
  generateAccessToken,
  loginController,
  registerController,
} from "../controller/auth.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/access-token", generateAccessToken);
authRouter.get("/me", verifyAccessToken, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});
export default authRouter;
