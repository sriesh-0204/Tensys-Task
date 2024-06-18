import React from "react";
import "./index.scss";

const Input = ({ label, name, type, placeholder, value, onChange }) => {
  return (
    <div className="input-form-control">
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
