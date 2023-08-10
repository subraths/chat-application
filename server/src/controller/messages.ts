import { Request, Response } from "express";
import { db } from "../utils/db";
import { MESSAGE_QUERY } from "../utils/queries";

export const getInitialData = async (req: Request, res: Response) => {
  const { user } = req;
  const currentUser = await db.one("SELECT * FROM users WHERE username = $1", [
    user,
  ]);
  const self = {
    user_id: currentUser.id,
    firstName: currentUser.first_name,
    lastName: currentUser.last_name,
    username: currentUser.username,
    email: currentUser.email,
  };
  const messagesResultDB = await db.many(MESSAGE_QUERY, [currentUser.id]);
  return res.json({ self, messages: messagesResultDB });
};
