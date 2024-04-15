import { CLIENT_BASE_URL } from "../config/serverConfig.js";

export async function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(CLIENT_BASE_URL + "/login");
}
