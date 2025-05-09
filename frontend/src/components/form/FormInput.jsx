import React from "react";

const FormInput = ({
  type = "text",
  field,
  placeholder,
  optionalOrRequired = "",
  name,
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">{field}</legend>
        <input
          type={type}
          className="input"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        <p className="fieldset-label">{optionalOrRequired}</p>
      </fieldset>
    </div>
  );
};

export default FormInput;
