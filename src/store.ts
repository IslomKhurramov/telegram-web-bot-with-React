import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import PicturePageReducer from "./components/form/slice";

export const store = configureStore({
  reducer: {
    picture: PicturePageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
