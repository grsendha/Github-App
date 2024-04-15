import express from "express";
import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import { PORT } from "./config/serverConfig.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
