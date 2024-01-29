import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedule: (state, action) => {
      console.log(action.payload);
      return [...state, ...action.payload];
    },
  },
});

export const scheduleActions = scheduleSlice.actions;

export default scheduleSlice.reducer;
