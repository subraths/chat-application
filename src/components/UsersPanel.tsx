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
  TextField,
  Autocomplete,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedUser } from "../redux/selectedUser";
import { Chat, addNewUser } from "../redux/chatSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetUserMutation, useSearchUserMutation } from "../redux/apiSlice";
import { login } from "../redux/currentUserSlice";

export default function UsersPanel() {
  const currentUser = useAppSelector((state) => state.user);
  const chat = useAppSelector((state) => state.chat);
  const selectedUser = useAppSelector((state) => state.selectedUser);
  const [searchUser] = useSearchUserMutation();
  const [searchUsers, setSearchUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [getUser] = useGetUserMutation();

  const dispatch = useAppDispatch();

  const fetchUser = async (username) => {
    const data = await getUser({ username }).unwrap();
    if (data) {
      dispatch(addNewUser(data));
    }
  };

  useEffect(() => {
    if (username) {
      fetchUser(username);
    }
  }, [username]);

  const handleUserSelection = (user: Chat) => {
    dispatch(setSelectedUser(user));
  };

  const handleChangeSearch = async (e, username) => {
    const users = await searchUser({ username }).unwrap();
    if (users.length) {
      setSearchUsers(users);
    }
    if (username) {
    }
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
    <Box sx={{ minWidth: 360, minHeight: "100vh", overflowY: "auto" }}>
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

        <Divider />
        <Box sx={{ width: "full", px: 2, pt: 1 }}>
          <Autocomplete
            onChange={(event: any, newValue: string | null) => {
              setUsername(newValue);
            }}
            onInputChange={handleChangeSearch}
            value={username}
            freeSolo
            id="selectSearchUser"
            disableClearable
            options={searchUsers.map((user) => user.username)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>
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
