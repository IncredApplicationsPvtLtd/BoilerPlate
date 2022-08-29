import React from "react";
import Job from "./Job";
import styles from './jobcontainer.module.css';
import {useSelector,useDispatch} from 'react-redux';
import { httpGetAllJob } from "../../features/allJob/allJobSlice";
import { useEffect } from "react";
const JobContainer = () => {
  const dispatch=useDispatch();
  const {isLoading,jobs}=useSelector((store)=>{
    return store.allJob;
  })

  useEffect(()=>{
    dispatch(httpGetAllJob())

  },[])

  const uiHelper=()=>{
    if(isLoading){
      return <h1>Loading Jobs ....</h1>
    }
    if(jobs.length===0){
      return <p>No Jobs Found</p>
    }

    return jobs.map((job)=>{
       return <Job job={job} key={job._id}/>
    })

  }
  
  return (
    <>
    <h2 className={styles.total__found}>{jobs.length} Jobs Found</h2>
    <div className={styles.all__jobs}>
    {uiHelper()}
    </div>
    </>
  );
};

export default JobContainer;
