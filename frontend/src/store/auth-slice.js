import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin : false
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.isLogin = true  // 로그인
    },
    Logout: (state, action) => {
      state.isLogin = false; // 로그아웃
    },
  },
});

export default authSlice.reducer;
export const authAction = authSlice.actions;