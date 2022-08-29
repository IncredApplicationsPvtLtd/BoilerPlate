import React from "react";
const FormSelect = (props) => {
  const { labelText, name, labelClass, selectClass, list, handleChange,value } =
    props;
  return (
    <>
      <label htmlFor={name} className={labelClass}>
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        className={selectClass}
        onChange={handleChange}
      >
        {list?.map((el, index) => {
          return (
            <option value={el?.val} key={index}>
              {el.name}
            </option>
          );
        })}
      </select>
    </>
  );
};
export default FormSelect;
