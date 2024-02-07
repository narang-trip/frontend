import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  day: 0,
  startHour: 0,
  startMinute: 0,
  endHour: 0,
  endMinute: 0,
  blackHeight: 0,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTime: (state, action) => {
      console.log(action);
      state.day = Number(action.payload.day);
      state.startHour = action.payload.startHour;
      state.startMinute = action.payload.startMinute;
      state.endHour = action.payload.endHour;
      state.endMinute = action.payload.endMinute;
    },
    setHeight: (state, action) => {
      state.blackHeight = action.payload;
    },
  },
});

export const timeActions = timeSlice.actions;
export default timeSlice.reducer;
