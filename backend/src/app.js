import express from "express";
import { connectDb } from "./config/database.js";
import authRouter from "./routes/auth.route.js";
import cookiParser from "cookie-parser";
import homeRouter from "./routes/home.route.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
connectDb();
app.use(express.json());
app.use(cookiParser());

app.use("/api/auth/", authRouter);
app.use("/api/home", homeRouter);
export default app;
