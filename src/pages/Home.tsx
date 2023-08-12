import { Box } from "@mui/material";
import ChatUI from "../components/ChatUI";
import UsersPanel from "../components/UsersPanel";
import { useConnectQuery } from "../redux/apiSlice";
import { setInitialChatData } from "../redux/chatSlice";
import { login } from "../redux/currentUserSlice";
import { useAppDispatch } from "../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const { data, isLoading } = useConnectQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (isLoading) return <p>loading</p>;
  if (!data && !isLoading) {
    navigate("/signin");
  }
  if (data) {
    dispatch(login(data.self));
    dispatch(setInitialChatData(data.messages));
  }
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <UsersPanel />
        <ChatUI />
      </Box>
    </>
  );
}
