import { Box } from "@mui/material";
import ChatUI from "../components/ChatUI";
import UsersPanel from "../components/UsersPanel";

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <UsersPanel />
      <ChatUI />
    </Box>
  );
}
