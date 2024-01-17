import { createSlice } from "@reduxjs/toolkit";
import { PictureState } from "../../types/picture";

const initialState: PictureState = {
  picture: [],
};
const pictureSlice = createSlice({
  name: "picture_data",
  initialState,
  reducers: {
    setPicture: (state, action) => {
      state.picture = action.payload;
    },
  },
});
export const { setPicture } = pictureSlice.actions;
const PicturePageReducer = pictureSlice.reducer;
export default PicturePageReducer;
