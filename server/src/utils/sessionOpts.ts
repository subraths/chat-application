import { redisStore } from "./redis";

export const sessionOpts = {
  store: redisStore,
  secret: "not easily parsable by humans",
  saveUninitialized: false,
  resave: false,
  cookie: { sameSite: true, httpOnly: true },
};
