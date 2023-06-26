import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import citaReducer from "../features/quote/citaSlice";

export const store = configureStore({
  reducer: {
    quote: citaReducer,
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
