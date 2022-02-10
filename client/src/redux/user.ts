import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: string | null;
  token: string | null;
}

const initialState: UserState = {
  userId: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.userId = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
