import express from "express";
import { VerifyToken } from "server/utils/verifyToken.js";
import {addComment, deleteComment, findComment} from "server/controllers/comment.js";

const router = express.Router();

router.post("/:id", VerifyToken, addComment);
router.get("/find/:id", VerifyToken, findComment);
router.delete("/:id", VerifyToken, deleteComment);

export default router;
