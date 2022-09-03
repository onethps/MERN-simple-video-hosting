import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateError } from "../utils/error.js";

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(CreateError(404, "User not Found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(CreateError(400, "Wrong userName or Password"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    let { password, ...other } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res
      .set("Access-Control-Allow-Credentials", req.headers.origin, "true")
      .status(200)
      .json(other);
  } catch (err) {
    //todo
    next(err);
  }
};

export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token", { path: "/" });
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (err) {
    //todo
    console.log(err);
    next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User Created");
  } catch (err) {
    //todo
    next(err);
  }
};

export const checkAuth = async (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    if (token) {
      res.status(200).send("U ARE COOl");
    }
    if (!token) return next(CreateError(401, "You Are not Authorized"));
  } catch (e) {
    next(e);
  }
};
export const createGoogleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(user._doc);
    } else {
      const newGoogleUser = await new User({ isGoogleUser: true, ...req.body });
      await newGoogleUser.save();
      const token = jwt.sign({ id: newGoogleUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(newGoogleUser._doc);
    }
  } catch (e) {
    next(e);
  }
};
