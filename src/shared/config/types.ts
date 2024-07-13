export enum TaskStatuses {
  PENDING = 0,
  COMPLETE = 1,
  OVERDUE,
  REMOVED,
}
export type TaskType = {
  id: string;
  title?: string;
  description?: string;
  deadline?: Date;
  status: TaskStatuses;
};

export type TasksType = {
  [key: TaskType["id"]]: TaskType;
};
