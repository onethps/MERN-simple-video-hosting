import express from "express";
import {
  deleteUser,
  getUser,
  subUser,
  unSubUser,
  updateUser,
} from "controllers/user.js";
import { VerifyToken } from "utils/verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", VerifyToken, updateUser);

//delete User
router.delete("/:id", deleteUser);

//get user
router.get("/find/:id", getUser);

// sub user
router.put("/sub/:id", VerifyToken, subUser);

// unsub user
router.delete("/unsub/:id", VerifyToken, unSubUser);

export default router;
