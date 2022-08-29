import React from "react";

const FormInput = (props) => {
  const {
    type,
    name,
    labelText,
    labelClass,
    inputClass,
    placeholder,
    handleChange,
    handleValidation,
    value
  } = props;

  return (
    <>
      <label htmlFor={name} className={labelClass}>
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        className={inputClass}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleValidation}
      />
    </>
  );
};

export default FormInput;
