// 하나의 저장소를 유지하면서 개별적인 Slice 파일 관리 가능
import { configureStore } from "@reduxjs/toolkit";
import directionsSliceReducer from "./directionsSlice.js";
import placesSliceReducer from "./placeSlice.js";
import authReducer from "./authSlice.js";
import tripReducer from "./tripSlice.js";
import scheduleSliceReducer from "./scheduleSlice.js";
import BoardSliceReducer from "./boardSlice.js";
import conceptSliceReducer from "./conceptSlice.js"
const store = configureStore({
  reducer: {
    directions: directionsSliceReducer,
    places: placesSliceReducer,
    auth: authReducer,
    trip: tripReducer,
    schedule: scheduleSliceReducer,
    board: BoardSliceReducer,
    concept : conceptSliceReducer
  },
});

export default store;
