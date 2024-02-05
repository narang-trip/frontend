// 하나의 저장소를 유지하면서 개별적인 Slice 파일 관리 가능
import { configureStore } from "@reduxjs/toolkit";
import directionsSliceReducer from "./directionsSlice";
import placesSliceReducer from "./placeSlice";
import authReducer from "./auth-slice";
import tripReducer from "./trip-slice";
import scheduleSliceReducer from "./scheduleSlice";
import BoardSliceReducer from "./boardSlice";
import TimeSliceReducer from "./timeSlice";

const store = configureStore({
  reducer: {
    directions: directionsSliceReducer,
    places: placesSliceReducer,
    auth: authReducer,
    trip: tripReducer,
    schedule: scheduleSliceReducer,
    board: BoardSliceReducer,
    time: TimeSliceReducer,
  },
});

export default store;
