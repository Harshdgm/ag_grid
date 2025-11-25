import React, { useState, useMemo } from "react";
import { NestedData } from "../../data/NestedData.js";
import { calcLabel } from "../../utils/player.js";
import {groupRows} from "../../utils/groupRows.js";
import { calcFooter } from "../../utils/calcFooter";
import useRows from "../../hooks/useRows"; 
import useGlobalFilter from "../../hooks/useGlobalFilter";
import GroupRow from "./GroupRaw.jsx";
import FooterRow from "./FooterRaw.jsx";
import "./AgNestedData.css";

export default function AgNestedData({ storageKey = "ag-nested-v4" }) {
  const { input, setInput, filter: globalFilter } = useGlobalFilter();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }

      return { key, direction: "asc" };
    });
  };

 const [rows, setRows] = useRows(storageKey, NestedData);

  const [expandedMap, setExpandedMap] = useState(() => {
    const map = {};
    NestedData.forEach((r) => (map[r.country] = true));
    return map;
  });

  const [edit3Map, setEdit3Map] = useState({});
  const [edit4Map, setEdit4Map] = useState({});
  const [expanded4Map, setExpanded4Map] = useState({});

 const grouped = useMemo(() => {
  return groupRows(rows, globalFilter, sortConfig);
}, [rows, globalFilter, sortConfig]);

  const toggleGroup = (country) =>
    setExpandedMap((prev) => ({ ...prev, [country]: !prev[country] }));

  const toggleEdit3 = (id) =>
    setEdit3Map((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleEdit4 = (id) =>
    setEdit4Map((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleExpand4 = (id) =>
    setExpanded4Map((prev) => ({ ...prev, [id]: !prev[id] }));

  const updateRow = (id, patch) =>
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? {
          ...r,
          ...patch,
          wins: patch.wins ?? r.wins,
          fails: patch.fails ?? r.fails,
          total: (patch.wins ?? r.wins) + (patch.fails ?? r.fails),
          label: calcLabel(patch.wins ?? r.wins, patch.fails ?? r.fails),
        } : r
      )
    );

  const deleteRow = (id) =>
    setRows((prev) => prev.filter((r) => r.id !== id));

  const footer = useMemo(() => calcFooter(grouped), [grouped]);

  return (
    <div className="card">
      <div className="card-header">
        <h3>Nested Table</h3>

        <input
          type="text"
          placeholder="Search Data..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="global-filter"
        />
      </div>

      <div className="table">
        <div className="table-head">
         <div className="header-cell name" onClick={() => handleSort("athlete")}>
            Athlete {sortConfig.key === "athlete" && (sortConfig.direction === "asc" ? "▲" : "▼")}
          </div>

          <div className="header-cell" onClick={() => handleSort("year")}>
            Year {sortConfig.key === "year" && (sortConfig.direction === "asc" ? "▲" : "▼")}
          </div>

          <div className="header-cell" onClick={() => handleSort("total")}>
            Total {sortConfig.key === "total" && (sortConfig.direction === "asc" ? "▲" : "▼")}
          </div>

          <div className="header-cell" onClick={() => handleSort("label")}>
            Label {sortConfig.key === "label" && (sortConfig.direction === "asc" ? "▲" : "▼")}
          </div>

          <div className="header-cell">Wins</div>
          <div className="header-cell">Fails</div>
          <div className="header-cell actions">Actions</div>
        </div>

        <div className="table-body">
          {grouped.map((group) => (
            <GroupRow
              key={group.country}
              group={group}
              expandedMap={expandedMap}
              edit3Map={edit3Map}
              edit4Map={edit4Map}
              expanded4Map={expanded4Map}
              toggleGroup={toggleGroup}
              toggleEdit3={toggleEdit3}
              toggleEdit4={toggleEdit4}
              toggleExpand4={toggleExpand4}
              updateRow={updateRow}
              deleteRow={deleteRow}
            />
          ))}
          <FooterRow footer={footer} />
        </div>
      </div>
    </div>
  );
}
