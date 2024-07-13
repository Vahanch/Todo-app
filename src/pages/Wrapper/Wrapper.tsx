import React, { useState } from "react";
import cn from "classnames";
import { Button } from "@mui/material";

import { Header } from "src/widgets/Header";
import { TasksList } from "src/widgets/TasksList";
import { FormModal } from "src/features/formModal";

import styles from "./Wrapper.module.scss";

export const Wrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <Header />

      <h2 className={cn(styles.title, "h2")}>TODO APP</h2>

      <Button size="small" variant="contained" onClick={onOpen}>
        Create new task
      </Button>

      <div className={styles.container}>
        <TasksList />
      </div>

      <FormModal open={isOpen} onClose={onClose} />
    </div>
  );
};
