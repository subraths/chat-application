import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Messages = {
  message_id: number | undefined;
  message: string;
  receiver: string;
  sender: string;
};

type SelectedUser = {
  user_id: number | undefined;
  username: string;
  firstname: string;
  lastname: string;
  messages: Array<Messages> | [];
};

const initialState: SelectedUser = {
  user_id: undefined,
  username: "",
  firstname: "",
  lastname: "",
  messages: [],
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<SelectedUser>) => {
      return action.payload;
    },
  },
});

export const { reducer: selectedUserReducer } = selectedUserSlice;
export const { setSelectedUser } = selectedUserSlice.actions;
