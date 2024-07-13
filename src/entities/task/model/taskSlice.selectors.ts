import { RootState } from "src/app/model/store";
import { TaskStatuses, TaskType } from "src/shared/config";

export const selectAllTasks = (state: RootState) => {
  return Object.values(state.tasks).map((task) => task);
};

export const selectActiveTasks = (state: RootState) => {
  return Object.values(state.tasks).filter(
    (task) => task.status === TaskStatuses.PENDING,
  );
};

export const selectCompletedTasks = (state: RootState) => {
  return Object.values(state.tasks).filter(
    (task) => task.status === TaskStatuses.COMPLETE,
  );
};

export const selectOverdueTasks = (state: RootState) => {
  return Object.values(state.tasks).filter(
    (task) => task.status === TaskStatuses.OVERDUE,
  );
};

export const selectRemovedTasks = (state: RootState) => {
  return Object.values(state.tasks).filter(
    (task) => task.status === TaskStatuses.REMOVED,
  );
};

export const selectTaskById = (id: TaskType["id"]) => (state: RootState) => {
  return state.tasks[id];
};
