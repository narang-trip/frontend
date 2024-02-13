import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {
      console.log(action.payload);
      state.isLogin = true; // 로그인
      state.token = action.payload.token; // 이거 유효성 체크 조금이라도 넣어봅시다.
      window.sessionStorage.setItem("token", action.payload.token);
    },
    Logout: (state) => {
      state.isLogin = false; // 로그아웃
      state.token = "";
      window.sessionStorage.removeItem("token");
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
