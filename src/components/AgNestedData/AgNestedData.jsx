import React, { useEffect, useMemo, useState } from "react";
import "./AgNestedData.css";

const SAMPLE = [
  { id: 1, country: "USA", athlete: "Michael Phelps", year: 2008, total: 8 },
  { id: 2, country: "USA", athlete: "Ryan Lochte", year: 2012, total: 6 },
  { id: 3, country: "Russia", athlete: "Svetlana", year: 2004, total: 2 },
  { id: 4, country: "Russia", athlete: "Anna", year: 2004, total: 3 },
  { id: 5, country: "Canada", athlete: "Alex", year: 2010, total: 5 },
  { id: 6, country: "Canada", athlete: "Chris", year: 2012, total: 2 },
];

export default function GroupedByCountryTable({ storageKey = "groupedTable_v1" }) {
  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : SAMPLE;
  });

  const [expandedMap, setExpandedMap] = useState(() => ({}));
  const [aggFilter, setAggFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(rows));
  }, [rows, storageKey]);

  const grouped = useMemo(() => {
    const map = new Map();

    rows.forEach((r) => {
      const key = r.country || "Unknown";
      if (!map.has(key)) map.set(key, { country: key, items: [], total: 0 });
      const group = map.get(key);
      group.items.push(r);
      group.total += Number(r.total) || 0;
    });

    const groups = Array.from(map.values())
      .map((g) => {
        const items = textFilter
          ? g.items.filter(
              (it) =>
                (it.athlete || "").toString().toLowerCase().includes(textFilter.toLowerCase()) ||
                (it.year || "").toString().includes(textFilter)
            )
          : g.items;
        const total = items.reduce((s, it) => s + Number(it.total || 0), 0);
        return { ...g, items, total };
      })
      .filter((g) => {
        if (!aggFilter) return true;
        return g.total.toString().includes(aggFilter);
      });

    return groups;
  }, [rows, aggFilter, textFilter]);

  const toggleGroup = (country) => {
    setExpandedMap((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  const editRow = (id) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, _editing: true } : r)));
  };
  const cancelEdit = (id) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, _editing: false } : r)));
  };
  const saveRow = (id, updated) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated, _editing: false } : r)));
  };

  const deleteRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const addRow = () => {
    const maxId = rows.reduce((m, r) => Math.max(m, r.id || 0), 0);
    const newRow = { id: maxId + 1, country: "New", athlete: "New athlete", year: 2024, total: 0 };
    setRows((prev) => [newRow, ...prev]);
  };

  const GroupHeader = ({ group }) => {
    const expanded = !!expandedMap[group.country];
    return (
      <div className="group-header">
        <button className="chev" onClick={() => toggleGroup(group.country)} aria-label="toggle">
          {expanded ? "▾" : "▸"}
        </button>

        <div className="group-title">
          <div className="group-name">{group.country}</div>
          <div className="group-meta">Total: <strong>{group.total}</strong></div>
        </div>
      </div>
    );
  };

  
  const RowEditor = ({ row }) => {
    const [local, setLocal] = useState({ athlete: row.athlete, year: row.year, total: row.total });

    return (
      <div className="row-editor">
        <input
          className="small-input"
          value={local.athlete}
          onChange={(e) => setLocal((s) => ({ ...s, athlete: e.target.value }))}
        />
        <input
          type="number"
          className="small-input"
          value={local.year}
          onChange={(e) => setLocal((s) => ({ ...s, year: Number(e.target.value) }))}
        />
        <input
          type="number"
          className="small-input"
          value={local.total}
          onChange={(e) => setLocal((s) => ({ ...s, total: Number(e.target.value) }))}
        />
        <button className="btn save" onClick={() => saveRow(row.id, local)}>Save</button>
        <button className="btn cancel" onClick={() => cancelEdit(row.id)}>Cancel</button>
      </div>
    );
  };

  const RowDisplay = ({ row }) => (
    <div className="row-display">
      <div className="cell">{row.athlete}</div>
      <div className="cell">{row.year}</div>
      <div className="cell">{row.total}</div>
      <div className="cell actions">
        <button className="btn" onClick={() => editRow(row.id)}>Edit</button>
        <button className="btn danger" onClick={() => deleteRow(row.id)}>Delete</button>
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h3>Grouped by Country (free React implementation)</h3>
        <div className="controls">
          <input
            placeholder="Filter groups by aggregated total (e.g. '12')"
            value={aggFilter}
            onChange={(e) => setAggFilter(e.target.value)}
            className="filter-input"
          />
          <input
            placeholder="Search athlete or year..."
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
            className="filter-input"
          />
          <button className="btn primary" onClick={addRow}>Add Row</button>
        </div>
      </div>

      <div className="table">
        <div className="table-head">
          <div className="header-cell name">Athlete</div>
          <div className="header-cell">Year</div>
          <div className="header-cell">Total</div>
          <div className="header-cell actions">Actions</div>
        </div>

        <div className="table-body">
          {grouped.map((g) => (
            <div key={g.country} className="group">
              <GroupHeader group={g} />

              {expandedMap[g.country] !== false ? (
                g.items.length ? (
                  g.items.map((row) => (
                    <div key={row.id} className="table-row">
                      {row._editing ? <RowEditor row={row} /> : <RowDisplay row={row} />}
                    </div>
                  ))
                ) : (
                  <div className="empty-group">No rows matching filters</div>
                )
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
