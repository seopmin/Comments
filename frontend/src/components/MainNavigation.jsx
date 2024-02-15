import React from "react";
import styles from './MainNavigation.module.css';

const MainNavigation = (props) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Comments</h1>
    </header>
  );
};

export default MainNavigation;
