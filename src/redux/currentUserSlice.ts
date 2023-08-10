import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User {
  user_id: number | undefined;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

const initialUserState: User = {
  user_id: undefined,
  username: "",
  firstName: "",
  lastName: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const { user_id, username, firstName, lastName, email } = action.payload;
      state.user_id = user_id;
      state.username = username;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
    },
    logout: () => {},
  },
});

export const { login, logout } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
