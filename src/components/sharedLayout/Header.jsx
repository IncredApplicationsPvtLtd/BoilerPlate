import React from "react";
import styles from "./header.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logoutAdmin } from "../../features/admin/adminSlice";

const Header = () => {
    const dispatch=useDispatch();
    const [isProfile,setIsProfile]=useState(false);
    const {admin}=useSelector((store)=>{
      return store.admin;
    })

    const handleLogout=()=>{
      dispatch(logoutAdmin('Logging Out..'));

    }

  return (
    <>
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <h3>DSOBS CMS</h3>
      </div>
      <div className={styles.header__profile} onClick={()=>{setIsProfile(!isProfile)}}>
        <p>{admin?.name}</p>
        <div>
          <AiFillCaretDown className={styles.header__icon} />
        </div>
      </div>
    </div>
    {isProfile && (<div className={styles.profile__options}>
        <Link to='/profile' className={styles.profile__link}>My Profile</Link>
        <button type="button" onClick={handleLogout}>Log Out</button>

    </div>)}
    
    </>
  );
};
export default Header;
