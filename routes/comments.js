import express from "express";
import {VerifyToken} from "../utils/verifyToken.js";
import {addComment, deleteComment, findComment} from "../controllers/comment.js";

const router = express.Router();

router.post("/:id", VerifyToken, addComment);
router.get("/find/:id", VerifyToken, findComment);
router.delete("/:id", VerifyToken, deleteComment);

export default router;
