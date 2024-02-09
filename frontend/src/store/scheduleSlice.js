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
    // 일정 추가하기
    addSchedule: (state, action) => {
      state.list[action.payload.day].splice(action.payload.index, 0, action.payload.schedule);
    },
    // 일정 움직이기
    moveSchedule: (state, action) => {
      const data = state.list[action.payload.start.day].splice(action.payload.start.index, 1);
      state.list[action.payload.end.day].splice(action.payload.end.index, 0, ...data);
    },
    // 저장된 계획 불러오기
    setSchedule: (state, action) => {
      console.log(action.payload);
      state.time = action.payload.time;
      state.blackHeight = action.payload.blackHeight;
      state.list = action.payload.list;
      state = action.payload;
    },
    // 여행 계획표의 시간 설정
    setTime: (state, action) => {
      console.log(action.payload);
      state.time = action.payload;
      state.time.lineCnt = action.payload.totalTime / 30 + 1;
      // 설정한 날 만큼 빈칸으로 채워진 일정 생성
      for (var i = 0; i < action.payload.totalDay; i++) {
        state.list.push([]);
        for (var j = 0; j < action.payload.totalTime / 10; j++) {
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
      state.list[action.payload.day][action.payload.index].time = action.payload.time;
    },
    // 일정 한마디
    setComment: (state, action) => {
      state.list[action.payload.day][action.payload.index].comment = action.payload.comment;
    },
  },
});

export const scheduleActions = scheduleSlice.actions;

export default scheduleSlice.reducer;
