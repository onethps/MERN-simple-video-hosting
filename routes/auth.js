import express from "express";
import {
  createGoogleUser,
  signIn,
  signup,
  logOut,
  checkAuth,
} from "../controllers/auth.js";

const router = express.Router();

//create A USER
router.post("/signup", signup);

//check AUth
router.get("/auth", checkAuth);

//SIGN IN
router.post("/signin", signIn);

//LOG OUT
router.delete("/logout", logOut);

//GOGOGLE IN
router.post("/google", createGoogleUser);

export default router;
