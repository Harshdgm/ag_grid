import React, { useCallback, useRef, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { calculateTotals } from "../../utils/addFooterRow";
import { filterRows } from "../../utils/filterData"; 
import AgeFilter from "./AgeFilter";
import { fetchOlympicData } from "../../api/api";
import asDate from "./rowDate";
import "./ExternalFilter.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function ExternalFilter() {
  const gridRef = useRef(null);
  const [ageType, setAgeType] = useState("everyone");
  const [searchText, setSearchText] = useState("");

  const { data: rowData, isLoading, isError } = useQuery({
    queryKey: ["olympicData"],
    queryFn: fetchOlympicData,
  });

  const handleFilterChange = useCallback((newValue) => {
    setAgeType(newValue);
    gridRef.current?.api.onFilterChanged();
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const filteredRowData = useMemo(() => filterRows(rowData, searchText, ageType), [
    rowData,
    searchText,
    ageType,
  ]);

  const totals = useMemo(
    () => calculateTotals(filteredRowData, ["gold", "silver", "bronze"]),
    [filteredRowData]
  );

  const columnDefs = [
    { field: "athlete", minWidth: 180 },
    { field: "age", filter: "agNumberColumnFilter", minWidth: 20 },
    { field: "country" },
    { field: "year", minWidth: 60 },
    {
      field: "date",
      // filter: "agDateColumnFilter",
      // filterParams: {
      //   comparator: (selectedDate, rowDateValue) => {
      //     const rowDate = asDate(rowDateValue);
      //     return rowDate.getTime() - selectedDate.getTime();
      //   },
      //},
      maxWidth: 100,
    },
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
  ];

  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="test-container">
      <h1>AG Grid with external filter</h1>

      <input
        type="text"
        placeholder="Search Data..."
        value={searchText}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <br />

      <AgeFilter onFilterChange={handleFilterChange} />

      <div className="totals-container">
        <span>Gold: {totals.gold}</span>{" | "}
        <span>Silver: {totals.silver}</span>{" | "}
        <span>Bronze: {totals.bronze}</span>
      </div>

      <div style={{ height: "500px", width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={filteredRowData}
          columnDefs={columnDefs}
          
        />
      </div>
    </div>
  );
}
