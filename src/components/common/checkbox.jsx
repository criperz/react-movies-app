import React from "react";

const CheckBox = ({ name, checked, label, onChange }) => {
  return (
    <div className="form-group form-check">
      <input
        id={name}
        className="form-check-input"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
