import mongoose from "mongoose";
import { MONGO_URL } from "../config/serverConfig.js";

export default async function connectMongoDB() {
  try {
    await mongoose.connect(MONGO_URL).then(() => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.log(error);
  }
}
