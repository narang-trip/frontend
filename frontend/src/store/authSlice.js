import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  code: "",
  userId: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {
      console.log(action.payload);
      state.isLogin = true; // 로그인
      state.code = action.payload.code; // 이거 유효성 체크 조금이라도 넣어봅시다.
      state.userId = action.payload.userId; // 이거 유효성 체크 조금이라도 넣어봅시다.
    },
    Logout: (state) => {
      state.isLogin = false; // 로그아웃
      state.code = "";
      state.userId = "";
      window.sessionStorage.removeItem("code");
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
