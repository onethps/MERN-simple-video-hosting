import jwt from "jsonwebtoken";
import { CreateError } from "../utils/error.js";

export const VerifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies)
  if (!token) return next(CreateError(401, "You Are not Authorized"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(CreateError(403, "Token not valid"));
    req.user = user;
    next();
  });
};
