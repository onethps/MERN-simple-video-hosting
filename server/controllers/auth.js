import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {CreateError} from "../utils/error.js";


export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({name: req.body.name});
    if (!user) return next(CreateError(404, "User not Found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(CreateError(400, "Wrong userName or Password"));

    const token = jwt.sign({id: user._id}, process.env.JWT);

    let {password, ...other} = user._doc;

    res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
  } catch (err) {
    //todo
    next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({...req.body, password: hash});
    await newUser.save();
    res.status(200).send("User Created");
  } catch (err) {
    //todo
    next(err);
  }
};


export const createGoogleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (user) {
      const token = jwt.sign({id: user._id}, process.env.JWT);
      res
          .cookie("access_token", token, {
            httpOnly:true
          })
          .json(user._doc)

    } else {
      const newGoogleUser = await new User({isGoogleUser: true, ...req.body})
      await newGoogleUser.save()
      const token = jwt.sign({id: user._id}, process.env.JWT);
      res
          .cookie("access_token", token, {
            httpOnly:true
          })
          .json(newGoogleUser._doc)
    }
  } catch (e) {
    next(e)
  }
}
