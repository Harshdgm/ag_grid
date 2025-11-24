import React from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import "./AgNestedData.css";

export default function NestedRow({
  row,
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
    <div className="nested-block">
      <div className={`table-roww ${edit3Map[row.id] ? "editing" : ""}`}>
        <div className="row-display">
          <button className="chev" onClick={() => toggleExpand4(row.id)}>
            {expanded4Map[row.id] ? <FiChevronDown /> : <FiChevronRight />}
          </button>
          <input
            className="small-input borderless"
            value={row.athlete}
            disabled={!edit3Map[row.id]}
            onChange={(e) => updateRow(row.id, { athlete: e.target.value })}
          />
          <input
            type="number"
            className="small-input borderless"
            value={row.year}
            disabled={!edit3Map[row.id]}
            onChange={(e) => updateRow(row.id, { year: Number(e.target.value) })}
          />
          <div className="cell">{row.total}</div>
          <div className="cell">{row.label}</div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell actions">
            <button className="btn primary" onClick={() => toggleEdit3(row.id)}>
              {edit3Map[row.id] ? "Save" : "Edit"}
            </button>
            <button className="btn danger" onClick={() => deleteRow(row.id)}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {expanded4Map[row.id] && (
        <div className={`nested-row wins-fails ${edit4Map[row.id] ? "editing" : ""}`}>
          {edit4Map[row.id] ? (
            <>
              <div className="cell"></div>
              <div className="cell"></div>
              <div className="cell"></div>
              <div className="cell"></div>
              <input
                type="number"
                value={row.wins}
                className="small-input"
                onChange={(e) => updateRow(row.id, { wins: Number(e.target.value) })}
              />
              <input
                type="number"
                value={row.fails}
                className="small-input"
                onChange={(e) => updateRow(row.id, { fails: Number(e.target.value) })}
              />
            </>
          ) : (
            <>
              <div className="cell"></div>
              <div className="cell"></div>
              <div className="cell"></div>
              <div className="cell"></div>
              <div className="cell">{row.wins}</div>
              <div className="cell">{row.fails}</div>
            </>
          )}
          <div className="cell actions">
            <button className="btn primary" onClick={() => toggleEdit4(row.id)}>
              {edit4Map[row.id] ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
