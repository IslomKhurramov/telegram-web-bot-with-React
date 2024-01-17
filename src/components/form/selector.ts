import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../types/picture";

const selectPicture = (state: AppRootState) => state.picture;

export const retrievePicture = createSelector(
  selectPicture,
  (Picture) => Picture.picture
);
