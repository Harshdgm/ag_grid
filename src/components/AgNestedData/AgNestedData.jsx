import React, { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import "./AgNestedData.css";

const SAMPLE = [
  { id: 1, country: "USA", athlete: "Michael Phelps", year: 2008, wins: 7, fails: 1 },
  { id: 2, country: "USA", athlete: "Ryan Lochte", year: 2012, wins: 4, fails: 2 },
  { id: 3, country: "Russia", athlete: "Svetlana", year: 2004, wins: 1, fails: 1 },
  { id: 4, country: "Russia", athlete: "Anna", year: 2004, wins: 2, fails: 1 },
  { id: 5, country: "Canada", athlete: "Alex", year: 2010, wins: 4, fails: 1 },
  { id: 6, country: "Canada", athlete: "Chris", year: 2012, wins: 1, fails: 1 },
];

const calcLabel = (wins, fails) => {
  if (wins > fails) return "Good Player";
  if (fails > wins) return "Average Player";
  return "Neutral";
};

export default function AgNestedData({ storageKey = "ag-nested-v4" }) {
  const [rows, setRows] = useState(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);

    return SAMPLE.map((r) => ({
      ...r,
      wins: r.wins ?? 0,
      fails: r.fails ?? 0,
      total: (r.wins ?? 0) + (r.fails ?? 0),
      label: calcLabel(r.wins ?? 0, r.fails ?? 0),
    }));
  });

  const [expandedMap, setExpandedMap] = useState({});
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

    return Object.entries(map).map(([country, items]) => ({
      country,
      items,
      total: items.reduce((sum, r) => sum + r.total, 0),
    }));
  }, [rows]);

  const toggleGroup = (country) => {
    setExpandedMap((prev) => ({
      ...prev,
      [country]: !prev[country],
    }));
  };

  const toggleEdit3 = (id) => {
    setEdit3Map((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleEdit4 = (id) => {
    setEdit4Map((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleExpand4 = (id) => {
    setExpanded4Map((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateRow = (id, patch) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              ...patch,
              wins: patch.wins ?? r.wins,
              fails: patch.fails ?? r.fails,
              total: (patch.wins ?? r.wins) + (patch.fails ?? r.fails),
              label: calcLabel(patch.wins ?? r.wins, patch.fails ?? r.fails),
            }
          : r
      )
    );
  };

  const deleteRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const addRow = () => {
    const maxId = rows.reduce((m, r) => Math.max(m, r.id), 0);
    setRows((prev) => [
      {
        id: maxId + 1,
        country: "New Country",
        athlete: "New Athlete",
        year: 2024,
        wins: 0,
        fails: 0,
        total: 0,
        label: "Neutral",
      },
      ...prev,
    ]);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>3-Level Nested Table + 4th Layer (Editable)</h3>
        <button className="btn primary" onClick={addRow}>
          Add Row
        </button>
      </div>

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
          {grouped.map((g) => (
            <div key={g.country} className="group">
              <div className="group-header" onClick={() => toggleGroup(g.country)}>
                <button className="chev">{expandedMap[g.country] ? <FiChevronDown /> : <FiChevronRight />}</button>
                <div className="group-title">
                  <div className="group-name">{g.country}</div>
                  <div className="group-meta">
                    Total: <strong>{g.total}</strong>
                  </div>
                </div>
              </div>

              {expandedMap[g.country] &&
                g.items.map((row) => (
                  <div key={row.id} className="nested-block">
                    {/* 3rd Layer - Athlete Row */}
                    
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
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
