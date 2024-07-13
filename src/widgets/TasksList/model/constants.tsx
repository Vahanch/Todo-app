import {
  CheckBox,
  CheckBoxOutlineBlank,
  ListAlt,
  RemoveCircle,
  WatchLater,
} from "@mui/icons-material";
import React from "react";

import { SortedTasksTabs } from "../config/types";

export const navigationItems: {
  [key in SortedTasksTabs]: { label: string; icon: React.ReactNode };
} = {
  [SortedTasksTabs.ALL]: {
    label: "All",
    icon: <ListAlt />,
  },
  [SortedTasksTabs.ACTIVE]: {
    label: "Active",
    icon: <CheckBoxOutlineBlank />,
  },
  [SortedTasksTabs.COMPLETED]: {
    label: "Completed",
    icon: <CheckBox />,
  },
  [SortedTasksTabs.OVERDUE]: {
    label: "Overdue",
    icon: <WatchLater />,
  },
  [SortedTasksTabs.REMOVED]: {
    label: "Removed",
    icon: <RemoveCircle />,
  },
};
