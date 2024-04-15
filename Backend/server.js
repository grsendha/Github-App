import express from "express";
import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.route.js";
import { PORT } from "./config/serverConfig.js";
import cors from "cors";
import "./passport/auth.passport.js";
import passport from "passport";
import session from "express-session";

import connectMongoDB from "./database/connectDatabase.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
