import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "./hooks";
import { current } from "@reduxjs/toolkit";

export type Chat = {
  user_id: number;
  firstName: string;
  lastName: string;
  messages: string;
  username: string;
};

const initialState: [] | Array<Chat> = [];
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setInitialChatData: (state, action: PayloadAction<Array<Chat>>) => {
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
  },
});

export const { reducer: chatReducer } = chatSlice;
export const { setInitialChatData, addIncomingMessage, addOutgoingMessage } =
  chatSlice.actions;
