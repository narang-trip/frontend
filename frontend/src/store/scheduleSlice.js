import { createSlice, current } from "@reduxjs/toolkit";
import { DirectionsService } from "@react-google-maps/api";

const initialState = {
  // 여행 제목
  title: null,
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
    addSchedule: async (state, action) => {
      state.list[action.payload.day].splice(action.payload.index, 0, action.payload.schedule);
      const tmpList = await calculateDurations(current(state.list));
      state.list = tmpList;
    },
    // 일정 움직이기
    moveSchedule: (state, action) => {
      const data = state.list[action.payload.start.day].splice(action.payload.start.index, 1);
      state.list[action.payload.end.day].splice(action.payload.end.index, 0, ...data);
    },
    // 저장된 계획 불러오기
    setSchedule: (state, action) => {
      console.log(action.payload);
      state.title = action.payload.title;
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
    // 계획표 제목 정하기
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    // 초기화
    reset: () => {
      return initialState;
    },
  },
});

export const scheduleActions = scheduleSlice.actions;

export default scheduleSlice.reducer;

async function calculateDurations(list) {
  console.log("여기 와지는지 테스트");
  const newList = list.map((day) => [...day]);

  for (let i = 0; i < newList.length; i++) {
    let prevLoca = null;
    let prevIdx = 0;
    for (let j = 0; j < newList[i].length; j++) {
      if (!newList[i][j]) continue;
      console.log(newList[i][j].title);
      if (newList[i][j].title !== null && newList[i][j].title !== undefined) {
        let curLoca = list[i][j].loca;
        let curIdx = j;
        if (prevLoca !== null) {
          const minute = await getDuration(prevLoca, curLoca);
          const cnt = Math.ceil(minute / 600);
          console.log(cnt);
          console.log(curIdx - prevIdx - 1);
          if (curIdx - prevIdx < cnt) {
            const emptySlots = new Array(cnt - (curIdx - prevIdx - 1)).fill([]);
            newList[i].splice(prevIdx + 1, 0, ...emptySlots);
            newList[i].splice(-emptySlots.length);
            j += cnt - (curIdx - prevIdx - 1);
          }
        }
        prevLoca = curLoca;
        prevIdx = curIdx;
      }
    }
  }

  console.log(newList);
  return newList;
}

// async function calculateDurations(list) {
//   console.log("여기 와지는지 테스트");
//   const newList = list.map((day) => [...day]);
//   const updateList = [];
//   for (let i = 0; i < newList.length; i++) {
//     let prevLoca = null;
//     let prevIdx = 0;
//     for (let j = 0; j < newList[i].length; j++) {
//       if (!newList[i][j]) continue;
//       console.log(newList[i][j].title);
//       if (newList[i][j].title !== null && newList[i][j].title !== undefined) {
//         let curLoca = list[i][j].loca;
//         let curIdx = j;
//         if (prevLoca !== null) {
//           const minute = await getDuration(prevLoca, curLoca);
//           const cnt = Math.ceil(minute / 600);
//           console.log(cnt);
//           console.log(curIdx - prevIdx - 1);
//           if (curIdx - prevIdx < cnt) {
//             const emptySlots = new Array(cnt - (curIdx - prevIdx - 1)).fill([]);
//             newList[i].splice(prevIdx + 1, 0, ...emptySlots);
//             newList[i].splice(-emptySlots.length);
//             j += cnt - (curIdx - prevIdx - 1);
//           }
//         }
//         prevLoca = curLoca;
//         prevIdx = curIdx;
//       }
//     }
//     updateList.push(newList[i]);
//   }
//   console.log(updateList);
//   return updateList;
// }

async function getDuration(pl, cl) {
  return new Promise((resolve, reject) => {
    const directionsService = new window.google.maps.DistanceMatrixService();
    console.log("여기까지도?", pl, cl);
    directionsService.getDistanceMatrix(
      {
        origins: [new window.google.maps.LatLng(pl[0], pl[1])],
        destinations: [new window.google.maps.LatLng(cl[0], cl[1])],
        travelMode: "TRANSIT",
      },
      (response, status) => {
        if (status === "OK") {
          console.log(response);
          console.log(response.rows[0].elements[0].duration);
          resolve(response.rows[0].elements[0].duration.value);
        } else {
          console.log("Error:", status);
          reject(new Error("Error:" + status));
        }
      }
    );
  });
}
