import React from "react";

const CommonInput = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-[var(--accent-color)] font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-[var(--primary-color)] text-[var(--text-color)] border border-[var(--accent-color)] 
                   rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
      />
    </div>
  );
};

export default CommonInput;
