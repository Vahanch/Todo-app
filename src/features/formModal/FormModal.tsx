import React from "react";
import { Button, Modal } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";
import cn from "classnames";

import { Input } from "src/shared/ui";
import { taskModel } from "src/entities/task";
import { useAppDispatch, useAppSelector, useMedia } from "src/shared/hooks";
import { TaskType } from "src/shared/config";

import styles from "./FormModal.module.scss";

type FormModalProps = {
  open: boolean;
  onClose: () => void;
  id?: TaskType["id"];
};

const schema = yup
  .object({
    title: yup.string().required("Title text is required"),
    description: yup.string().optional(),
    deadline: yup.date().optional(),
  })
  .required();

type SchemaPayload = InferType<typeof schema>;

export const FormModal: React.FC<FormModalProps> = (props) => {
  const { open, onClose, id } = props;

  const { isPhone } = useMedia();

  const dispatch = useAppDispatch();

  const editedTask = useAppSelector(
    taskModel.selectors.selectTaskById(id ?? ""),
  );

  const { handleSubmit, control, reset } = useForm<SchemaPayload>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: editedTask?.title ?? "",
      description: editedTask?.description ?? "",
      deadline: editedTask?.deadline,
    },
  });

  const onSubmit: SubmitHandler<SchemaPayload> = (data: SchemaPayload) => {
    if (id) {
      dispatch(
        taskModel.actions.editTask({
          ...data,
          id,
        }),
      );
    } else {
      dispatch(taskModel.actions.addTask(data));
    }
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h3 className={cn(styles.title, "h4")}>Create/Edit Task</h3>

        <Controller
          name="title"
          control={control}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Input
              label="Title"
              variant="standard"
              value={value}
              onChange={onChange}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Input
              label="Description"
              variant="standard"
              value={value}
              onChange={onChange}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="deadline"
          control={control}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Input
              label="Deadline"
              variant="standard"
              value={value}
              type="date"
              onChange={onChange}
              error={!!errors.deadline}
              helperText={errors.deadline?.message}
              fullWidth
            />
          )}
        />

        <div className={styles.buttons}>
          <Button
            size={isPhone ? "small" : "medium"}
            variant="text"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            size={isPhone ? "small" : "medium"}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};
