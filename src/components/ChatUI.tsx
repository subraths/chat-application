import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import MessagesPanel from "./MessagesPanel";
import { useEffect } from "react";
import { socket } from "../socket";
import { addIncomingMessage } from "../redux/chatSlice";

const ChatUI = () => {
  const selectedUser = useAppSelector((state) => state.selectedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();

    socket.on("private_message", (data) => {
      dispatch(addIncomingMessage(data));
    });

    return () => {
      socket.disconnect();
      socket.off("private_message");
    };
  }, []);

  return (
    <>
      {selectedUser.username ? (
        <MessagesPanel key={selectedUser.username} />
      ) : (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            bgcolor: "grey.200",
            flexGrow: 1,
          }}
        ></Box>
      )}
    </>
  );
};

export default ChatUI;
