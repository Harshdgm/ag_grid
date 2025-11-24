import React from "react";
import NestedRow from "./NestedRaw";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import "./AgNestedData.css";

export default function GroupRow({
  group,
  expandedMap,
  toggleGroup,
  edit3Map,
  edit4Map,
  expanded4Map,
  toggleEdit3,
  toggleEdit4,
  toggleExpand4,
  updateRow,
  deleteRow
}) {
  return (
    <div className="group">
      <div className="group-header">
        <button className="chev" onClick={() => toggleGroup(group.country)}>
          {expandedMap[group.country] ? <FiChevronDown /> : <FiChevronRight />}
        </button>

        <div className="row-display group-header-row">
          <div className="cell country-name">{group.country}</div>
          <div className="cell">{group.commonYear}</div>
          <div className="cell">{group.total}</div>
          <div className="cell">{group.commonLabel}</div>
          <div className="cell">{group.wins}</div>
          <div className="cell">{group.fails}</div>
          <div className="cell actions">{group.actions}</div>
        </div>
      </div>

      {expandedMap[group.country] &&
        group.items.map((row) => (
          <NestedRow
            key={row.id}
            row={row}
            edit3Map={edit3Map}
            edit4Map={edit4Map}
            expanded4Map={expanded4Map}
            toggleEdit3={toggleEdit3}
            toggleEdit4={toggleEdit4}
            toggleExpand4={toggleExpand4}
            updateRow={updateRow}
            deleteRow={deleteRow}
          />
        ))}
    </div>
  );
}
