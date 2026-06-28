import { Router } from "express";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const homeRouter = Router();

homeRouter.get("/", verifyAccessToken, (req, res) => {
  return res.status(200).json({
    message: "home fetched",
  });
});

export default homeRouter;
