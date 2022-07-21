import Video from "models/Video.js";
import { CreateError } from "utils/error.js";
import User from "models/Users.js";

export const addVideo = async (req, res, next) => {
  const video = new Video({ userId: req.user.id, ...req.body });
  try {
    const saveVideo = await video.save();
    res.status(200).json(saveVideo);
  } catch (e) {
    next(e);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(CreateError(404, "Video Not Found"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(CreateError(403, "You can update only yours"));
    }
  } catch (e) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video success deleted");
    } else {
      return next(CreateError(403, "You can delete only yours"));
    }
  } catch (e) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    let video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("views has been inc");
  } catch (e) {
    next(e);
  }
};

export const rand = async (req, res, next) => {
  try {
    let videos = await Video.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json(videos);
  } catch (e) {
    next(e);
  }
};

export const trend = async (req, res, next) => {
  try {
    let videos = await Video.findById().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (e) {
    next(e);
  }
};

export const subscribeVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subChannels = user.subscribedUsers;

    const list = await Promise.all(
      subChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (e) {
    next(e);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (e) {
    next(e);
  }
};

export const likeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The videos has been liked");
  } catch (e) {
    next(e);
  }
};

export const dislikeVideo = async (req, res, next) => {
  const videoId = req.params.videoId;
  const id = req.user.id;

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("The videos has been disliked");
  } catch (e) {
    next(e);
  }
};
