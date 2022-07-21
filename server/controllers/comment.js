import Comment from "server/models/Comment.js";
import Video from "server/models/Video.js";
import { CreateError } from "server/utils/error.js";

export const addComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      userId: req.user.id,
      videoId: req.params.id,
      ...req.body,
    });

    const saveComment = await comment.save();
    res.status(200).send(saveComment);
  } catch (e) {
    next(e);
  }
};

export const findComment = async (req, res, next) => {
  try {
    const comment = await Comment.find({videoId:req.params.id})
    res.status(200).json(comment);
  } catch (e) {
    next(e);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    const comment = await Comment.findById(req.params.id);

    if (req.user.id === video.userId || req.user.id === comment.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).send("Comment was successfully deleted");
    } else {
      next(CreateError(403, "Error video was not deleted"));
    }
  } catch (e) {
    next(e);
  }
};
