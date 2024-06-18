import React from "react";
import './index.scss'

function Button({ onClick, label, type, className }) {
  return (
    <div>
      <button onClick={onClick} type={type} className={`primary-color p-2 ${className}`}>
        {label}
        </button>
    </div>
  );
}

export default Button;
