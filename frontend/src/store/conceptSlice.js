import { createSlice } from "@reduxjs/toolkit";
import { conceptColorObject} from "../data/concepts"
const initialState = {
  concept: "낭만",
  conceptColor: "E99D9D",
};
const conceptSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {
    changeConcept: (state, action) => {
      state.concept = action.payload.concept; // 컨셉 및 색깔 바꾸기
      state.conceptColor = conceptColorObject[action.payload.concept];
    },
  },
});

export default conceptSlice.reducer;
export const conceptActions = conceptSlice.actions;
