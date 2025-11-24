import React, { useEffect, useMemo, useState } from "react";
import { NestedData } from "../../data/NestedData.js";
import { calcLabel } from "../../utils/player.js";
import GroupRow from "./GroupRaw.jsx";
import FooterRow from "./FooterRaw.jsx";
import "./AgNestedData.css";

export default function AgNestedData({ storageKey = "ag-nested-v4" }) {
  const [rows, setRows] = useState(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);

    return NestedData.map((r) => ({
      ...r,
      wins: r.wins ?? 0,
      fails: r.fails ?? 0,
      total: (r.wins ?? 0) + (r.fails ?? 0),
      label: calcLabel(r.wins ?? 0, r.fails ?? 0)
    }));
  })

  const [expandedMap, setExpandedMap] = useState(() => {
    const map = {};
    NestedData.forEach(r => {
      map[r.country] = true; 
    });
    return map;
  });
  const [edit3Map, setEdit3Map] = useState({});
  const [edit4Map, setEdit4Map] = useState({});
  const [expanded4Map, setExpanded4Map] = useState({});

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(rows));
  }, [rows, storageKey]);

  const grouped = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      if (!map[r.country]) map[r.country] = [];
      map[r.country].push(r);
    });

    return Object.entries(map).map(([country, items]) => {
      const years = items.map((r) => r.year);
      const allSameYear = years.every((y) => y === years[0]);
      const commonYear = allSameYear ? years[0] : "";

      const labels = items.map((r) => r.label);
      const allSameLabel = labels.every((l) => l === labels[0]);
      const commonLabel = allSameLabel ? labels[0] : "";

      return {
        country,
        items,
        total: items.reduce((sum, r) => sum + r.total, 0),
        commonYear,
        commonLabel
      };
    });
  }, [rows]);

  const toggleGroup = (country) => setExpandedMap((prev) => ({ ...prev, [country]: !prev[country] }));
  const toggleEdit3 = (id) => setEdit3Map((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleEdit4 = (id) => setEdit4Map((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleExpand4 = (id) => setExpanded4Map((prev) => ({ ...prev, [id]: !prev[id] }));
  const updateRow = (id, patch) => setRows((prev) => prev.map((r) =>
    r.id === id ? { ...r, ...patch, wins: patch.wins ?? r.wins, fails: patch.fails ?? r.fails, total: (patch.wins ?? r.wins) + (patch.fails ?? r.fails), label: calcLabel(patch.wins ?? r.wins, patch.fails ?? r.fails) } : r
  ));
  const deleteRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  const footer = useMemo(() => {
    if (!grouped.length) return {};
    const years = grouped.map((g) => g.items[0].year);
    const allSameYear = years.every((y) => y === years[0]);
    const footerYear = allSameYear ? years[0] : "";

    const labels = grouped.map((g) => g.items[0].label);
    const allSameLabel = labels.every((l) => l === labels[0]);
    const footerLabel = allSameLabel ? labels[0] : "";
    const footerTotal = grouped.reduce((sum, g) => sum + g.total, 0);

    return { footerYear, footerTotal, footerLabel };
  }, [grouped]);

  return (
    <div className="card"> 
      <h3>Nested Table</h3>
      <div className="table">
        <div className="table-head">
          <div className="header-cell name">Athlete</div>
          <div className="header-cell">Year</div>
          <div className="header-cell">Total</div>
          <div className="header-cell">Label</div>
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
