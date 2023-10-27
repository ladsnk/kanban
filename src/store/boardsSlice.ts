import uuid from "react-uuid";
import { RootState } from ".";
import { ColumnProps } from "../components/Column";
import data from "../data.json";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = data.boards;

const boardsSlice = createSlice({
  name: "boards",
  initialState: initialState,
  reducers: {
    changeBoard: (state, action: PayloadAction<string>) => {
      state.map((el) => {
        if (el.name === action.payload) {
          el.isActive = true;
        } else {
          el.isActive = false;
        }
      });
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      const newState = state.filter((el) => el.name !== action.payload);
      return newState;
    },
    createBoard: (state, action) => {
      state.push(action.payload);
    },
    addTask: (state, action) => {
      const activeBoard = state.find((board) => board.isActive === true);
      const column = activeBoard?.columns.find(
        (col) => col.name === action.payload.status
      );
      column?.tasks.push(action.payload);
    },
    editBoard: (state, action) => {
      const activeBoard = state.find((board) => board.isActive === true);
      if (activeBoard) {
        activeBoard.name = action.payload.name;

        activeBoard.columns = action.payload.columns.map(
          (col: ColumnProps, index: number) => {
            if (activeBoard.columns[index]) {
              return {
                name: col.name,
                tasks: activeBoard.columns[index].tasks,
                id: col.id,
              };
            } else {
              return {
                name: col.name,
                tasks: [],
                id: uuid(),
              };
            }
          }
        );
      }
    },
    correctTask: (state, { payload }) => {
      // allows to apply minor changes
      const activeBoard = state.find((board) => board.isActive === true);
      let fromColumn = activeBoard?.columns.find(
        (col) => col.name === payload.oldStatus
      )!;
      let toColumn = activeBoard?.columns.find(
        (col) => col.name === payload.updatedTask.status
      );

      // update subtasks and status
      fromColumn.tasks = fromColumn.tasks.map((task) =>
        task.id === payload.updatedTask.id ? payload.updatedTask : task
      );
      const currentTask = fromColumn?.tasks.find(
        (task) => task.id === payload.updatedTask.id
      )!;

      // change status if needed
      if (fromColumn?.name !== toColumn?.name) {
        fromColumn.tasks = fromColumn?.tasks.filter(
          (task) => task.id !== currentTask.id
        );
        toColumn?.tasks.push(currentTask);
      }
    },
    modifyTask: (state, { payload }) => {
      // allows to apply major changes
      const activeBoard = state.find((board) => board.isActive === true);
      let fromColumn = activeBoard?.columns.find(
        (col) => col.name === payload.currStatus
      )!;
      let toColumn = activeBoard?.columns.find(
        (col) => col.name === payload.updatedTask.status
      );

      // update subtasks and status
      fromColumn.tasks = fromColumn.tasks.map((task) =>
        task.id === payload.updatedTask.id ? payload.updatedTask : task
      );
      const currentTask = fromColumn?.tasks.find(
        (task) => task.id === payload.updatedTask.id
      )!;

      // change status
      if (fromColumn?.name !== toColumn?.name) {
        console.log("stat");
        fromColumn.tasks = fromColumn?.tasks.filter(
          (task) => task.id !== currentTask.id
        );
        toColumn?.tasks.push(currentTask);
      }
    },
    deleteTask: (state, { payload }) => {
      const activeBoard = state.find((board) => board.isActive === true);
      const column = activeBoard?.columns.find(
        (col) => col.name === payload.status
      )!;
      column.tasks = column?.tasks.filter((task) => task.id !== payload.id);
    },
    dropTask: (state, { payload }) => {
      const activeBoard = state.find((board) => board.isActive === true);
      const fromColumn = activeBoard?.columns.find(
        (col) => col.id === payload.source.droppableId
      );
      const toColumn = activeBoard?.columns.find(
        (col) => col.id === payload.destination.droppableId
      );

      // grab and drop task
      const currentTask = fromColumn?.tasks.splice(payload.source.index, 1)!;
      toColumn?.tasks.splice(payload.destination.index, 0, currentTask[0]);
    },
  },
});

// selectors
export const getActiveBoard = createSelector(
  (state: RootState) => state.boards,
  (boards) => boards.find((board) => board.isActive === true)
);

// actions
export const {
  changeBoard,
  deleteBoard,
  createBoard,
  addTask,
  editBoard,
  correctTask,
  modifyTask,
  deleteTask,
  dropTask,
} = boardsSlice.actions;

export default boardsSlice.reducer;
