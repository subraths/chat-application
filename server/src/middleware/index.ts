import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.session;
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  //Complete token verification
  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = payload.username;
    next();
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
};

export const socketAuth = (socket, next) => {
  const { token } = socket.request.session;
  try {
    const { username } = jwt.verify(token, ACCESS_TOKEN_SECRET);
    socket.username = username;
  } catch (error) {
    console.log(error);
  }
  next();
};
