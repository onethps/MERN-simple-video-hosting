import express from "express";
import { VerifyToken } from "../utils/verifyToken.js";
import {
  addVideo,
  addView,
  allVideos,
  category,
  deleteVideo,
  dislikeVideo,
  getVideo,
  likeVideo,
  rand,
  search,
  subscribeVideos,
  trend,
  updateVideo,
} from "../controllers/video.js";

const router = express.Router();

///create videos

router.get("/find/:id", getVideo);
router.put("/:id", VerifyToken, updateVideo);
router.post("/:id", VerifyToken, addVideo);
router.delete("/:id", VerifyToken, deleteVideo);
router.get("/sub", VerifyToken, subscribeVideos);

router.put("/like/:videoId", VerifyToken, likeVideo);
router.put("/dislike/:videoId", VerifyToken, dislikeVideo);
router.put("/view/:id", addView);
router.get("/trends", trend);
router.get("/random", rand);
router.get("/allvideos", allVideos);
router.get("/category/:category", category);
router.get("/search/", search);
router.put("/view/:id", addView);

export default router;
