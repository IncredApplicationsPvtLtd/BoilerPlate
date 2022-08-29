import React from "react";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import { AiFillHome,AiTwotoneCalendar } from "react-icons/ai";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <div className={styles.sidebar__links}>
            <AiFillHome/>
            <Link to="/jobs" className={styles.sidebar__link}>
              Jobs
            </Link>
          </div>
        </li>

        <li>
          <div className={styles.sidebar__links}>
            <AiTwotoneCalendar/>
            <Link to="/add-job" className={styles.sidebar__link}>
              Add Job
            </Link>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
