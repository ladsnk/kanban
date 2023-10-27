import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addTask: false,
  boards: false,
  editBoard: false,
  options: false,
  createBoard: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState: initialState,
  reducers: {
    addTaskHandler(state) {
      state.addTask = !state.addTask;
    },
    boardsHandler(state) {
      state.boards = !state.boards;
    },
    editBoardHandler(state) {
      state.editBoard = !state.editBoard;
    },
    optionsHandler(state) {
      state.options = !state.options;
    },
    createBoardHandler(state) {
      state.createBoard = !state.createBoard;
    },
  },
});

export const {
  addTaskHandler,
  boardsHandler,
  editBoardHandler,
  optionsHandler,
  createBoardHandler,
} = modalsSlice.actions;

export default modalsSlice.reducer;
