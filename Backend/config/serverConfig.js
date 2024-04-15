import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const GITHUB_API_KEY = process.env.GITHUB_API_KEY;
export const MONGO_URL = process.env.MONGO_URL;
