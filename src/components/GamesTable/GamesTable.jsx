import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const sampleData = [
  { country: "Russia", athlete: "Svetlana Khorkina", year: 2004, total: 2 },
  { country: "Russia", athlete: "Anna Pavlova", year: 2004, total: 2 },
  { country: "USA", athlete: "Michael Phelps", year: 2008, total: 8 },
  { country: "USA", athlete: "Ryan Lochte", year: 2012, total: 6 },
  { country: "Russia", athlete: "Anna Pav", year: 2005, total: 4 },
  { country: "Russia", athlete: "Anna Pavin", year: 2003, total: 4 },
  { country: "Canada", athlete: "Michael Phelp", year: 2010, total: 5 },
  { country: "Canada", athlete: "Ryan Khorkina", year: 2012, total: 8 },
  { country: "USA", athlete: "Anna Phelps", year: 2008, total: 4 },
  { country: "Canada", athlete: "Anna Phelps", year: 2006, total: 2 },
];

export default function GamesTable() {

  const [rowData, setRowData] = useState(() => {
    const map = {};
    sampleData.forEach((row) => {
      if (!map[row.country]) map[row.country] = { children: [], totalSum: 0, expanded: true, country: row.country };
      map[row.country].children.push(row);
      map[row.country].totalSum += row.total;
    });
    return Object.values(map);
  });

  const toggleExpand = (country) => {
    setRowData((prev) =>
      prev.map((row) => (row.country === country ? { ...row, expanded: !row.expanded } : row))
    );
  };

  const flattenedRows = useMemo(() => {
    const result = [];
    rowData.forEach((parent) => {
      result.push({ ...parent, isParent: true });
      if (parent.expanded) parent.children.forEach((child) => result.push(child));
    });
    return result;
  }, [rowData]);

  const columnDefs = [
    {
      field: "country",
      cellRenderer: (params) =>
        params.data.isParent ? (
          <span
            style={{ cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center" }}
            onClick={() => toggleExpand(params.data.country)}
          >
            {params.data.expanded ? <FiChevronDown /> : <FiChevronRight />}
            <span style={{ marginLeft: 5 }}>
              {params.data.country} (Total: {params.data.totalSum})
            </span>
          </span>
        ) : null,
    },
    { field: "athlete" },
    { field: "year" },
    { field: "total" },
  ];

  const getRowStyle = (params) => (params.data.isParent ? { backgroundColor: "#f9f9f9", fontWeight: "bold" } : { paddingLeft: "20px" });

  return (
    
    <div className="ag-theme-quartz" style={{ height: 200, width: "100%" }}>
      <h1>Nested Data : </h1>
      <AgGridReact
        rowData={flattenedRows}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1 }}
        getRowStyle={getRowStyle}
      />
    </div>
  );
}
