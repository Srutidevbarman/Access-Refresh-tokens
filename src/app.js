import express from "express";
import { connectDb } from "./config/database.js";
import authRouter from "./routes/auth.route.js";
import cookiParser from "cookie-parser";
import homeRouter from "./routes/home.route.js";
const app = express();
connectDb();
app.use(express.json());
app.use(cookiParser());

app.use("/auth/api", authRouter);
app.use("/auth/home", homeRouter);
export default app;
