import { Box, Avatar, Paper, Typography } from "@mui/material";
import { forwardRef, useEffect } from "react";

const Message = forwardRef(function (
  {
    message,
    sender,
    username,
    scroll,
  }: {
    message: string;
    sender: string;
    username: string;
    scroll: () => void;
  },
  ref
) {
  const otherUser = sender === username;

  useEffect(() => {
    scroll();
  }, [ref]);

  return (
    <div ref={ref}>
      <Box
        sx={{
          display: "flex",
          justifyContent: otherUser ? "flex-start" : "flex-end",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: otherUser ? "row" : "row-reverse",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ bgcolor: otherUser ? "primary.main" : "secondary.main" }}
          >
            {sender[0]}
          </Avatar>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              ml: otherUser ? 1 : 0,
              mr: otherUser ? 0 : 1,
              backgroundColor: otherUser ? "primary.light" : "secondary.light",
              borderRadius: otherUser
                ? "20px 20px 20px 5px"
                : "20px 20px 5px 20px",
            }}
          >
            <Typography variant="body1">{message}</Typography>
          </Paper>
        </Box>
      </Box>
    </div>
  );
});

export default Message;
