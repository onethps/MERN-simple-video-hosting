import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import userComments from "./routes/comments.js";
import authUser from "./routes/auth.js";
import cookieParser from "cookie-parser";
import videoRoutes from "./routes/videos.js";
import path from 'path'

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

//middleware
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/comments", userComments);
app.use("/api/auth", authUser);
app.use("/api/videos", videoRoutes);


const PORT = process.env.PORT || 8800

app.use(express.static(path.join(__dirname + "/public")))

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  connect();
});
