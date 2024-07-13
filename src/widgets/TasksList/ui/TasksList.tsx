import React, { useState } from "react";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  DateRangeOutlined,
  Delete,
  EditNoteRounded,
  RotateLeft,
} from "@mui/icons-material";
import cn from "classnames";
import moment from "moment";

import { taskModel } from "src/entities/task";
import { useAppDispatch, useMedia } from "src/shared/hooks";
import { FormModal } from "src/features/formModal";
import empty from "src/shared/assets/free_time.png";
import { navigationItems } from "src/widgets/TasksList/model/constants";
import { TaskStatuses, TaskType } from "src/shared/config/types";

import { useGetCurrentList } from "../hooks/useGetCurrentList";
import { SortedTasksTabs } from "../config/types";

import styles from "./TasksList.module.scss";

export const TasksList: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listValue, setListValue] = useState<SortedTasksTabs>(
    SortedTasksTabs.ALL,
  );

  const { isPhone, isTablet } = useMedia();

  const dispatch = useAppDispatch();

  const getCurrentList = useGetCurrentList();

  const tasks = getCurrentList(listValue);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleRemoveTask = (id: TaskType["id"]) => {
    taskModel.actions.removeTask(id);
  };

  const handleChangeTaskStatus = (id: TaskType["id"], status: TaskStatuses) => {
    dispatch(taskModel.actions.changeTaskStatus({ id, status }));
  };

  const handleEditTask = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        {!!tasks.length ? (
          <List className={styles.list}>
            {tasks.map((task) => (
              <ListItem key={task.id}>
                <Checkbox
                  disabled={
                    task.status === TaskStatuses.REMOVED ||
                    task.status === TaskStatuses.OVERDUE
                  }
                  checked={task.status === TaskStatuses.COMPLETE}
                  onChange={() => {
                    const status =
                      task.status === TaskStatuses.COMPLETE
                        ? TaskStatuses.PENDING
                        : TaskStatuses.COMPLETE;
                    handleChangeTaskStatus(task.id, status);
                  }}
                />
                <ListItemText
                  primary={
                    <div className={styles.primaryText}>
                      <h4 className="h5">{task.title}</h4>

                      {task.deadline && (
                        <div className={cn(styles.date, "h6")}>
                          {!isPhone && <DateRangeOutlined fontSize="small" />}
                          {moment(task.deadline).format("MM/DD/YYYY")}
                        </div>
                      )}
                    </div>
                  }
                  secondary={
                    task.description ? (
                      <Tooltip title={task.description}>
                        <h5 className={cn(styles.description, "p3")}>
                          {task.description}
                        </h5>
                      </Tooltip>
                    ) : (
                      ""
                    )
                  }
                  key={task.id}
                ></ListItemText>

                {task.status === TaskStatuses.REMOVED && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleChangeTaskStatus(task.id, TaskStatuses.PENDING);
                    }}
                  >
                    <RotateLeft color="success" />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  onClick={() => {
                    task.status === TaskStatuses.REMOVED
                      ? handleRemoveTask(task.id)
                      : handleChangeTaskStatus(task.id, TaskStatuses.REMOVED);
                  }}
                >
                  <Delete color="error" />
                </IconButton>
                <IconButton size="small" onClick={handleEditTask}>
                  <EditNoteRounded color="primary" />
                </IconButton>

                <FormModal open={isOpen} onClose={onClose} id={task.id} />
              </ListItem>
            ))}
          </List>
        ) : (
          <div className={cn(styles.noTasks, "h5")}>
            <img src={empty} alt="emply" />
            <h2>No tasks yet</h2>
          </div>
        )}

        <BottomNavigation
          showLabels
          value={listValue}
          className={styles.navigation}
          onChange={(_, newValue) => {
            setListValue(newValue);
          }}
        >
          {Object.keys(navigationItems).map((key) => {
            const currentItem =
              navigationItems[key as unknown as SortedTasksTabs];
            return (
              <BottomNavigationAction
                key={key}
                label={isTablet || isPhone ? "" : currentItem.label}
                icon={
                  <Badge
                    badgeContent={
                      getCurrentList(key as unknown as SortedTasksTabs).length
                    }
                    color="primary"
                  >
                    {currentItem.icon}
                  </Badge>
                }
              />
            );
          })}
        </BottomNavigation>
      </Box>
    </>
  );
};
