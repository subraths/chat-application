import { Server } from "socket.io";
import express from "express";
import http from "http";

export const app = express();
export const httpServer = http.createServer(app);

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: { origin: "http://localhost:5173", credentials: true },
  cookie: true,
});

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: (str: any) => void;
}

export interface ClientToServerEvents {
  private_message: (
    msg: any,
    ack: ({ status }: { status: number }) => void
  ) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
