import { Response, Request } from "express";
import { db } from "../utils/db";

export const searchUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  const users = await db.manyOrNone(
    "SELECT username FROM users WHERE username LIKE $1",
    [`${username}%`]
  );

  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  console.log(req.body);

  const { username } = req.body;
  const user = await db.oneOrNone(
    "SELECT id, username, first_name, last_name, email FROM users WHERE username = $1",
    [username]
  );

  res.json(user);
};
