import React from "react";
import './index.scss'

function Button({ onClick, label, type }) {
  return (
    <div>
      <button onClick={onClick} type={type} className="primary-color p-2">
        {label}
        </button>
    </div>
  );
}

export default Button;
