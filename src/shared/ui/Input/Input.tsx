import React from "react";
import cn from "classnames";
import { TextField, TextFieldProps } from "@mui/material";

import { useMedia } from "src/shared/hooks";

import styles from "./Input.module.scss";

export const Input: React.FC<TextFieldProps & { className?: string }> = (
  props,
) => {
  const { className, ...rest } = props;

  const { isPhone } = useMedia();

  return (
    <TextField
      {...rest}
      size={isPhone ? "small" : "medium"}
      className={cn(styles.input, className)}
    />
  );
};
