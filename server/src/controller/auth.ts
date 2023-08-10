import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../utils/db";
import { MESSAGE_QUERY } from "../utils/queries";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const currentUser = await db.one(
      "SELECT * FROM users WHERE username = $1 AND PASSWORD = $2",
      [username, password]
    );

    const accessToken = jwt.sign(
      {
        username: currentUser.username,
        email: currentUser.email,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const self = {
      user_id: currentUser.id,
      firstName: currentUser.first_name,
      lastName: currentUser.last_name,
      username: currentUser.username,
      email: currentUser.email,
    };

    const messagesResultDB = await db.many(MESSAGE_QUERY, [currentUser.id]);

    req.session.token = accessToken;
    req.session.refresh = refreshToken;

    res.json({ self, messages: messagesResultDB });
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password, firstName, lastName } = req.body;

  try {
    const queryResult = await db.query(
      "insert into users(first_name, last_name, username, email, password) values($1, $2, $3, $4, $5) returning first_name, last_name, username",
      [firstName, lastName, username, email, password]
    );
    res.status(201).json(queryResult[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
