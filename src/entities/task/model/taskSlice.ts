import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskStatuses, TasksType, TaskType } from "src/shared/config";

const initialState: TasksType = {};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<Omit<TaskType, "id" | "status">>,
    ) => {
      const id = crypto.randomUUID();

      state[id] = {
        ...action.payload,
        status: TaskStatuses.PENDING,
        id,
      };
    },
    changeTaskStatus: (
      state,
      action: PayloadAction<{ status: TaskStatuses; id: TaskType["id"] }>,
    ) => {
      state[action.payload.id].status = action.payload.status;
    },
    removeTask: (state, action: PayloadAction<TaskType["id"]>) => {
      delete state[action.payload];
    },
    editTask: (state, action: PayloadAction<Partial<TaskType>>) => {
      state[action.payload.id] = {
        ...state[action.payload.id],
        ...action.payload,
      };
    },
  },
});

export const { actions } = taskSlice;

export default taskSlice.reducer;
