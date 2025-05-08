const GenderCheckbox = ({ value, onChange }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer px-2`}>
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={value === "male"}
            onChange={() => onChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer px-2`}>
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={value === "female"}
            onChange={() => onChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
