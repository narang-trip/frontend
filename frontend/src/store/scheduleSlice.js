import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    // 일정 추가하기
    addSchedule: (state, action) => {
      state[action.payload[2]].splice(action.payload[1], 0, action.payload[0]);
    },
    // 일정 움직이기
    moveSchedule: (state, action) => {
      const data = state[action.payload[0][0]].splice(action.payload[0][1], 1);
      console.log(data);
      state[action.payload[1][0]].splice(action.payload[1][1], 0, ...data);
    },
    // 임시로 날짜 추가하기
    tmpAddDay: (state) => {
      state.push([]);
    },
    // 저장된 계획 불러오기
    setSchedule: (state, action) => {},
  },
});

export const scheduleActions = scheduleSlice.actions;

export default scheduleSlice.reducer;
