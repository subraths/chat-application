import {
  Box,
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  Avatar,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedUser } from "../redux/selectedUser";
import { Chat } from "../redux/chatSlice";

export default function UsersPanel() {
  const currentUser = useAppSelector((state) => state.user);
  const chat = useAppSelector((state) => state.chat);
  const selectedUser = useAppSelector((state) => state.selectedUser);

  const dispatch = useAppDispatch();

  const handleUserSelection = (user: Chat) => {
    dispatch(setSelectedUser(user));
  };

  const usersList = chat.map((user) => {
    if (user.username !== currentUser.username) {
      return (
        <ListItem key={user.user_id}>
          <ListItemButton
            selected={selectedUser.user_id === user.user_id}
            onClick={() => handleUserSelection(user)}
          >
            <ListItemIcon>
              <Avatar alt={user.username}>{user.username[0]}</Avatar>
            </ListItemIcon>
            <ListItemText>{user.username}</ListItemText>
          </ListItemButton>
        </ListItem>
      );
    }
  });

  return (
    <Box sx={{ minWidth: 360, minHeight: "100vh", overflowY: "scroll" }}>
      <Grid container sx={{ display: "flex", flexDirection: "column" }}>
        <Grid item>
          <List>
            <ListItem key={currentUser.username}>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt={currentUser?.username}>
                    {currentUser.username ? currentUser.username[0] : null}
                  </Avatar>
                </ListItemIcon>
                <ListItemText>{currentUser.username}</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item>
          <List>
            <Divider />
            {usersList}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
