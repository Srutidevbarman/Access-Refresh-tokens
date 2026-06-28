import mongoose from "mongoose";
import "dotenv/config";

export async function connectDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB");
}
