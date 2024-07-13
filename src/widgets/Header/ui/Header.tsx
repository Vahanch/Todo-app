import React from "react";

import src from "src/shared/assets/header.png";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return <img className={styles.img} src={src} alt="header" />;
};
