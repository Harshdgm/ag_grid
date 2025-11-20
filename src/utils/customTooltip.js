import React from "react";

export const CustomTooltip = ({ value }) => {
  return (
    <div style={{ padding: 5, background: "#333", color: "#fff", borderRadius: 4 }}>
      {value}
    </div>
  );
};
