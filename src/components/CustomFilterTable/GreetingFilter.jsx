import React from "react";

export default function GreetingFilter(params) {
  const row = params.data;
  if (!row) return null;

  const colors = params.colors ?? {};
  const cellStyles = params.cellStyles ?? {};

  const color = colors[row.sport] || "black";
  const handleClick = () => alert(row.athlete);

  return (
    <div
      style={{
        color,
        ...cellStyles,
        padding: "5px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      Hello {row.athlete}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
