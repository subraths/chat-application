import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { sessionOpts } from "./sessionOpts";
import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./socket";
import { ExtendedError } from "socket.io/dist/namespace";
import { Request } from "express";

// Initialize client.
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

export const sessionMiddleware = session(sessionOpts);

export const wrap =
  (middleware) =>
  (
    socket: Socket<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >,
    next: (err?: ExtendedError | undefined) => void
  ) =>
    middleware(socket.request, {}, next);
