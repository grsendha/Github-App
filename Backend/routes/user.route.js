import express from "express";
import { getUserProfileAndRepos } from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthentication.js";
import { likeProfile, getLikes } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos);
router.get("/likes", ensureAuthenticated, getLikes);
router.post("/like/:username", ensureAuthenticated, likeProfile);

export default router;
