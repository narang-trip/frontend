const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="text-xs">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="m-1"
      />
      {label}
    </label>
  );
};

export default Checkbox;