import express from "express";
import dotenv from "dotenv";
import router from "./router";
import cors from "cors";

import { app, httpServer, io } from "./utils/socket";
import { db } from "./utils/db";
import { wrap, sessionMiddleware } from "./utils/redis";
import { socketAuth } from "./middleware";
import { corsOpts } from "./utils/corsOpts";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(sessionMiddleware);
app.use(cors(corsOpts));
app.use("/", router);

io.use(wrap(sessionMiddleware));
io.use(socketAuth);

io.on("connection", (socket) => {
  socket.join(socket.username);

  socket.broadcast.emit("user_connected", socket.username);

  socket.on("private_message", async (data, ack) => {
    const { fromID, toID, toUser, fromUser, message } = data;
    console.log(toUser, socket.username);

    socket
      .to(toUser)
      .emit("private_message", { message, sender: fromUser, receiver: toUser });

    try {
      await db.query(
        "INSERT INTO messages(fromid, toid, content) VALUES ($1, $2, $3)",
        [data.fromID, data.toID, data.message]
      );
      ack({ status: 201 });
    } catch (err) {
      console.log(err);
    }
  });
});

httpServer.listen(PORT, () => console.log("server running on port ", PORT));
