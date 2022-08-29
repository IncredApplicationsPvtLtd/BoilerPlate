import React from "react";
import styles from "./addjob.module.css";
import { FormInput, FormSelect } from "./../../components";
import { useSelector, useDispatch } from "react-redux";
import { httpAddJob, handleChange,clearValue, httpEditJob } from "../../features/job/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useReducer } from "react";

const initialState={
  adminInValid:null,
  companyInValid:null
}

const reducerFn=(state,action)=>{
  //console.log('action-->',action);
  if(action.type==='title_CHANGE'){
    const val=action.payload;
    let valid=null;
    if(val.length <=3){
       valid=true;
    }
    return {...state,adminInValid:valid}
  }
}

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  // validation
  const [jobData,dispatchFn]=useReducer(reducerFn,initialState);
  
  const {
    isLoading,
    title,
    description,
    company,
    designation,
    openings,
    annualSalary,
    city,
    natureOfHire,
    natureOfHireOptions,
    gender,
    genderOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => {
    return store.job;
  });

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleJobValidation=(e)=>{
    dispatchFn({
      type:e.target.name+'_CHANGE',
      payload:e.target.value
    })
  }

  const handleSubmit = (e) => {
    console.log("form is submitted..");
    e.preventDefault();
    if(!title || !company){
      toast.error('Please Fill Fields');
      return;
    }
    if (isEditing) {
      // hit edit API
      dispatch(httpEditJob({
        jobId:editJobId,
        updatedData:{title,
          description,
          company,
          designation,
          openings,
          annualSalary,
          city,
          natureOfHire,
          gender,}
      }))
      setTimeout(() => {
        navigate('/jobs')
        
      }, 3000);
      return;
    }
    dispatch(
      httpAddJob({
        title,
        description,
        company,
        designation,
        openings,
        annualSalary,
        city,
        natureOfHire,
        gender,
      })
    );
    setTimeout(()=>{
      navigate('/jobs')

    },3000)
   // navigate('/jobs');
  };

  const handleClearValue=()=>{
    dispatch(clearValue())
  }
  return (
    <div className={styles.add__job}>
      <h3>Create A Job</h3>
      <form className={styles.job__form} onSubmit={handleSubmit}>
        {/* row1 */}
        <div className={styles.form__row}>
          <FormInput
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Job Title"
            labelText="Title of Job Post"
            labelClass={styles.label}
            inputClass={styles.input}
            handleChange={handleJobInput}
            handleValidation={handleJobValidation}
          />
          {jobData.adminInValid && <p>Invalid Job Title</p>}
        </div>
        {/* row2 */}
        <div className={styles.form__row}>
          <FormInput
            type="text"
            id="company"
            name="company"
            value={company}
            placeholder="TCS"
            labelText="Company Name"
            labelClass={styles.label}
            inputClass={styles.input}
            handleChange={handleJobInput}
          />
        </div>

        {/* row3 */}
        <div className={styles.form__row}>
          <FormInput
            type="text"
            id="designation"
            name="designation"
            value={designation}
            placeholder="CEO"
            labelText="Designation"
            labelClass={styles.label}
            inputClass={styles.input}
            handleChange={handleJobInput}
          />
        </div>

        {/* row4 */}
        <div className={styles.form__row}>
          <FormInput
            type="number"
            id="position"
            name="openings"
            value={openings}
            placeholder="5"
            labelText="No. Of Position"
            labelClass={styles.label}
            inputClass={styles.input}
            handleChange={handleJobInput}
          />
        </div>

        {/* row5 */}
        <div className={styles.form__row}>
          <FormInput
            type="number"
            id="salary"
            name="annualSalary"
            value={annualSalary}
            placeholder="90000"
            labelText="Annual Salary"
            labelClass={styles.label}
            inputClass={styles.input}
            handleChange={handleJobInput}
          />
        </div>

        {/* row6 */}
        <div className={styles.form__row}>
          <FormInput
            type="text"
            id="city"
            name="city"
            value={city}
            placeholder="Noida"
            labelText="City"
            labelClass={styles.label}
            inputClass={styles.input}
            handleChange={handleJobInput}
          />
        </div>

        {/* row7 */}
        <div className={styles.form__row}>
          <FormSelect
            labelText="Nature Of Hire"
            name="natureOfHire"
            labelClass={styles.label}
            selectClass={styles.select}
            list={natureOfHireOptions}
            value={natureOfHire}
            handleChange={handleJobInput}
          />
        </div>

        {/* row8 */}
        <div className={styles.form__row}>
          <FormSelect
            labelText="Gender"
            name="gender"
            labelClass={styles.label}
            selectClass={styles.select}
            list={genderOptions}
            value={gender}
            handleChange={handleJobInput}
          />
        </div>

        {/* row9 */}
        <div className={styles.form__row}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            rows="8"
            id="description"
            name="description"
            value={description}
            onChange={handleJobInput}
          ></textarea>
        </div>
        {/* row10 */}
        <div className={styles.form__row}>
          <button
            type="submit"
            className={styles.addjob__submit}
            onSubmit={handleSubmit}
          >
            {isLoading ? "Posting Job..." : isEditing ?"Update Job":"Post Job"}
          </button>
        </div>

        {/* row11 */}
        <div className={styles.form__row}>
          <button type="button" className={styles.addjob__submit} onClick={handleClearValue}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddJob;
