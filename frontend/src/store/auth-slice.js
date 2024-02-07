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
      state.code = action.payload; // 이거 유효성 체크 조금이라도 넣어봅시다. 
    },
    Logout: (state) => {
      state.isLogin = false; // 로그아웃
      state.code = "";
    },
  },
});

export default authSlice.reducer;
export const authAction = authSlice.actions;
