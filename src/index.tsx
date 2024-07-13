import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./shared/styles/styles.scss";
import { App } from "./app/App";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
