import express from "express";
import {createGoogleUser, signIn, signup} from "../controllers/auth.js";

const router = express.Router();

//create A USER
router.post("/signup", signup);

//SIGN IN
router.post("/signin", signIn);

//GOGOGLE IN
router.post("/google", createGoogleUser);

export default router;
