import { ChangeEvent, useState, useRef } from "react";
import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Message from "./Message";
import { socket } from "../socket";
import { addOutgoingMessage } from "../redux/chatSlice";

export default function MessagesPanel() {
  const selectedUser = useAppSelector((state) => state.selectedUser);
  const currentUser = useAppSelector((state) => state.user);
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const bottomRef = useRef<undefined | HTMLDivElement>(undefined);

  const displayedUser = useAppSelector((state) =>
    state.chat.find((user) => user.username === selectedUser.username)
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const { messages } = useAppSelector((state) =>
    state.chat.find((user) => user.username === selectedUser.username)
  );

  function scroll() {
    bottomRef.current?.scrollIntoView({
      behavior: "instant",
      block: "center",
    });
  }

  const handleSend = () => {
    if (input.trim() !== "") {
      dispatch(
        addOutgoingMessage({
          sender: currentUser.username,
          receiver: selectedUser.username,
          message: input,
        })
      );

      socket.emit(
        "private_message",
        {
          fromID: currentUser.user_id,
          toID: selectedUser.user_id,
          message: input,
          fromUser: currentUser.username,
          toUser: selectedUser.username,
        },
        (res) => console.log(res.status)
      );
      setInput("");
    }
  };

  return (
    <Box
      key={selectedUser.username}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
        flexGrow: 1,
        overflowAnchor: "none",
      }}
    >
      <Toolbar sx={{ bgcolor: "white" }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar>{selectedUser.username[0]}</Avatar>
            </ListItemIcon>
            <ListItemText primary={displayedUser.username} />
          </ListItem>
        </List>
      </Toolbar>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          overflowY: "scroll",
          overflowAnchor: "auto",
          height: "1px",
        }}
      >
        {messages.map(({ sender, message }, index) => {
          if (index === messages.length - 1) {
            return (
              <Message
                scroll={scroll}
                ref={bottomRef}
                key={index}
                message={message}
                sender={sender}
                username={selectedUser.username}
              />
            );
          }

          return (
            <Message
              scroll={scroll}
              key={index}
              message={message}
              sender={sender}
              username={selectedUser.username}
            />
          );
        })}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSend}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
