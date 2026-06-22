import React from "react";

const baseFieldStyle = {
  width: "100%",
  background: "rgba(15, 19, 40, 0.9)",
  border: "1px solid rgba(148, 163, 184, 0.16)",
  color: "#e5eefb",
  borderRadius: 12,
  padding: "14px 16px",
  fontSize: 14,
};

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  hint,
  required,
  rows = 4,
  options = [],
}) => {
  const commonProps = {
    name,
    value,
    onChange,
    placeholder,
    style: {
      ...baseFieldStyle,
      borderColor: error ? "rgba(244, 63, 94, 0.6)" : baseFieldStyle.border,
      boxShadow: error ? "0 0 0 3px rgba(244, 63, 94, 0.08)" : "none",
    },
  };

  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "flex", gap: 6, marginBottom: 10, fontSize: 13, fontWeight: 700, color: "#dbe7f7" }}>
        {label}
        {required ? <span style={{ color: "#fda4af" }}>*</span> : null}
      </span>

      {type === "textarea" ? (
        <textarea {...commonProps} rows={rows} />
      ) : type === "select" ? (
        <select {...commonProps}>
          <option value="">{placeholder || "Select an option"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...commonProps} type={type} />
      )}

      {hint ? <div style={{ marginTop: 8, fontSize: 12, color: "#8fa0bc", lineHeight: 1.5 }}>{hint}</div> : null}
      {error ? <div style={{ marginTop: 8, fontSize: 12, color: "#fda4af" }}>{error}</div> : null}
    </label>
  );
};

export default FormField;