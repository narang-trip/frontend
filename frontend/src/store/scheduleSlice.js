import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 여행 계획표의 시간
  time: {
    totalDay: 0,
    startHour: 0,
    startMinute: 0,
    endHour: 0,
    endMinute: 0,
    totalTime: 0,
    lineCnt: 0,
  },
  // 일정 사이간 간격
  blackHeight: 0,
  // 일정표
  list: [
    // 저장될 형태
    //   [
    //     {
    //       img: "",
    //       title: "",
    //       time: "",
    //       loca: [],
    //       comment: "",
    //     },
    // ],
  ],
};

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
    // 저장된 계획 불러오기
    setSchedule: (state, action) => {
      state = action.payload;
    },
    // 여행 계획표의 시간 설정
    setTime: (state, action) => {
      console.log(action.payload);
      state.time = action.payload;
      console.log(action.payload.totalTime);
      state.time.lineCnt = action.payload.totalTime / 30 + 1;
      // 설정한 날 만큼 빈칸으로 채워진 일정 생성
      console.log(action.payload.totalDay);
      for (var i = 0; i < action.payload.totalDay; i++) {
        state.list.push([]);
        for (var j = 0; j < action.payload.totalTime / 30 + 1; j++) {
          state.list[i].push([]);
        }
      }
    },
    // 빈칸 간격 설정
    setBlackHeight: (state, action) => {
      state.blackHeight = action.payload;
    },
    // 일정 체류시간 변경
    setScheduleTime: (state, action) => {
      state[action.payload[1]][action.payload[2]].time = action.payload[0];
    },
    // 일정 한마디
    setComment: (state, action) => {
      state[action.payload[1]][action.payload[2]].comment = action.payload[0];
    },
  },
});

export const scheduleActions = scheduleSlice.actions;

export default scheduleSlice.reducer;
