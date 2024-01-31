import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  code: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.isLogin = true; // 로그인
      state.code = action.payload;
    },
    Logout: (state) => {
      state.isLogin = false; // 로그아웃
      state.code = "";
    },
  },
});

export default authSlice.reducer;
export const authAction = authSlice.actions;
