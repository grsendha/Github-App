import express from "express";
import { loginController } from "../controllers/auth.controller.js";
import passport from "passport";
import { CLIENT_BASE_URL } from "../config/serverConfig.js";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: CLIENT_BASE_URL + `/login`,
  }),
  function (req, res) {
    res.redirect(CLIENT_BASE_URL);
  }
);

router.get("/check", (req, res) => {
  console.log("Checking user in route", req.isAuthenticated());
  console.log("User", req.user);
  if (req.isAuthenticated()) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "Logged out" });
  });
});

export default router;
