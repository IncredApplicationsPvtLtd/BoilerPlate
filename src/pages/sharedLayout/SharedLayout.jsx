import React from "react";
import { Header, Sidebar } from "./../../components";
import { Outlet } from "react-router-dom";
import styles from "./sharedLayout.module.css";
const SharedLayout = () => {
  return (
    <div className={styles.dashboard__container}>
      <Header />
      <Sidebar />
      <div className={styles.dashboard__page}>
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
