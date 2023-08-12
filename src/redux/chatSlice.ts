import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "./hooks";
import { current } from "@reduxjs/toolkit";
import { Messages } from "./selectedUser";

export type Chat = {
  user_id: number;
  firstName: string;
  lastName: string;
  messages: Array<Messages>;
  username: string;
  isOnline?: boolean;
};

const initialState: [] | Array<Chat> = [];
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setInitialChatData: (_, action: PayloadAction<Array<Chat>>) => {
      return action.payload;
    },
    addIncomingMessage: (state, action) => {
      const { message, sender, receiver } = action.payload;

      const user = state.find((user) => user.username === sender);
      user?.messages.push({ message_id: undefined, message, sender, receiver });
    },

    addOutgoingMessage: (state, action) => {
      const { sender, receiver, message } = action.payload;
      const user = state.find((user) => user.username === receiver);
      user?.messages.push({ message_id: undefined, message, sender, receiver });
    },

    setUserConnected: (state, action) => {
      const { username } = action.payload;
      const user = state.find((user) => user.username === username);
      user.isOnline = true;
    },
    addNewUser: (state, action) => {
      const { id, username, email, first_name, last_name } = action.payload;

      const userPresent = state.find(
        (user) => user.username === action.payload.username
      );
      if (!userPresent) {
        console.log("user not present ");

        state.push({
          id,
          username,
          email,
          first_name,
          last_name,
          messages: [],
        });
      }
      if (userPresent) {
        console.log("userpresent ", current(userPresent));
      }
    },
  },
});

export const { reducer: chatReducer } = chatSlice;
export const {
  setInitialChatData,
  addIncomingMessage,
  addOutgoingMessage,
  setUserConnected,
  addNewUser,
} = chatSlice.actions;
