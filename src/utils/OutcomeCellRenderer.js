import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const OutcomeCellRenderer = ({ value }) =>
  React.createElement(
    "div",
    { style: { display: "flex", justifyContent: "center", alignItems: "center" } },
    value === 1
      ? React.createElement(AiOutlineCheck, { style: { color: "green", fontSize: 20 } })
      : React.createElement(AiOutlineClose, { style: { color: "red", fontSize: 20 } })
  );

export default OutcomeCellRenderer;
