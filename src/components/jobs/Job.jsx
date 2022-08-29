import React from "react";
import styles from './job.module.css';
import {Link} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { httpDeleteJob, setEditJob } from "../../features/job/jobSlice";
const Job = (props) => {
  const dispatch=useDispatch();
  const {_id,title,description,company,designation,annualSalary,city,natureOfHire,gender,openings}=props.job;
  return (
    <div className={styles.job}>
      <div className={styles.job__top}>
        <span className={styles.job__title}>{title}</span>
        <span className={styles.job__city}>{company}, {city}</span>
       <div className={styles.underline}></div>
      </div>
      <div className={styles.job__bottom}>
        <div className={styles.bottom__top}>
          <p className={styles.designation}>{designation}</p>
          <p className={styles.salary}>Rs. {annualSalary}</p>
        </div>
        <div className={styles.center}>
          <p className={styles.hire}>{natureOfHire}</p>
          <p className={styles.gender}>{gender}</p>
        </div>
        <div className={styles.bottom}>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.cta}>
          <Link to="/add-job" className={styles.edit} onClick={()=>{
            dispatch(setEditJob({_id,title,company,city,designation,description,annualSalary,gender,natureOfHire,openings}))
          }}>Edit</Link>
          <button type="button" className={styles.delete} onClick={()=>{
            dispatch(httpDeleteJob(_id))
          }}>Delete</button>
        </div>

      </div>

    </div>
  );
};
export default Job;
