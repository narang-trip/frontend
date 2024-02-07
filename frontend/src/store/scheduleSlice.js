import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    sortSchedule: (state) => {
      let prevLoca = null;

      for (var i = 0; i < state.length; i++) {
        for (var j = 0; j < state[i].length; j++) {
          if (state[i][j].title !== "") {
            if (prevLoca !== null) {
              //경로구하는 함수
            }
            prevLoca = state[i][j].loca;
          }
        }
      }
    },
    // 일정 추가하기
    addSchedule: (state, action) => {
      // let dayTime = 0;
      // for (var i = 0; i < state[action.payload[2]].length; i++) {
      //   if (state[action.payload[2]][i].title !== "") dayTime += 1;
      //   else dayTime += state[action.payload[2]][i].time;
      // }
      // if (dayTime > )
      state[action.payload[2]].splice(action.payload[1], 0, action.payload[0]);
      // if (state[action.payload[2]].length < action.payload[1] + 12)
      //   state[action.payload[2]][action.payload[1]].time =
      //     (state[action.payload[2]].length - action.payload[1] - 1) * 10;
    },
    // 일정 움직이기
    moveSchedule: (state, action) => {
      const data = state[action.payload[0][0]].splice(action.payload[0][1], 1);
      console.log(data);
      state[action.payload[1][0]].splice(action.payload[1][1], 0, ...data);
    },
    // 임시로 날짜 추가하기
    tmpAddDay: (state, action) => {
      console.log(action.payload);
      state.push([]);
      for (var i = 0; i < action.payload * 3; i++) {
        state[state.length - 1].push([]);
      }
    },
    // 저장된 계획 불러오기
    setSchedule: (state, action) => {
      state = action.payload;
    },
    setTime: (state, action) => {
      console.log(action);
      state[action.payload[1]][action.payload[2]].time = action.payload[0];
    },
    setComment: (state, action) => {
      state[action.payload[1]][action.payload[2]].comment = action.payload[0];
    },
  },
});

export const scheduleActions = scheduleSlice.actions;

export default scheduleSlice.reducer;
