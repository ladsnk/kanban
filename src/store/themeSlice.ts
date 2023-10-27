import { createSlice } from "@reduxjs/toolkit";

const checkLocalStorage = () => {
  const theme = localStorage.getItem("theme");
  return theme !== null ? theme : "dark-theme";
};

const initialState = checkLocalStorage();

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      // return is necessary because state is primitive
      if (state === "dark-theme") {
        return (state = "light-theme");
      } else {
        return (state = "dark-theme");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
