import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardsSlice";
import themeSlice from "./themeSlice";
import modalsSlice from "./modalsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    theme: themeSlice,
    modals: modalsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
