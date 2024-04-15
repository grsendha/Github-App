import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const GITHUB_API_KEY = process.env.GITHUB_API_KEY;
export const MONGO_URL = process.env.MONGO_URL;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;
