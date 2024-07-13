import { useEffect } from "react";
import moment from "moment";

import { taskModel } from "src/entities/task";
import { useAppDispatch, useAppSelector } from "src/shared/hooks";
import { TaskStatuses, TaskType } from "src/shared/config";

import { SortedTasksTabs } from "../config/types";

export const useGetCurrentList = () => {
  const dispatch = useAppDispatch();

  const allTasks = useAppSelector(taskModel.selectors.selectAllTasks);
  const activeTasks = useAppSelector(taskModel.selectors.selectActiveTasks);
  const completedTasks = useAppSelector(
    taskModel.selectors.selectCompletedTasks,
  );
  const overdueTasks = useAppSelector(taskModel.selectors.selectOverdueTasks);

  const removedTasks = useAppSelector(taskModel.selectors.selectRemovedTasks);

  const allData: Record<SortedTasksTabs, TaskType[]> = {
    [SortedTasksTabs.ALL]: allTasks,
    [SortedTasksTabs.ACTIVE]: activeTasks,
    [SortedTasksTabs.COMPLETED]: completedTasks,
    [SortedTasksTabs.OVERDUE]: overdueTasks,
    [SortedTasksTabs.REMOVED]: removedTasks,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const dateNow = moment();

      allTasks.forEach((task) => {
        const currentDate = task.deadline ? moment(task.deadline) : null;

        if (
          currentDate &&
          (currentDate.isBefore(dateNow) || currentDate.isSame(dateNow, "day"))
        ) {
          dispatch(
            taskModel.actions.changeTaskStatus({
              id: task.id,
              status: TaskStatuses.OVERDUE,
            }),
          );
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [allTasks]);

  return (value: SortedTasksTabs) => {
    return allData[value];
  };
};
