import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./AggregationTable.css";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
} from "ag-grid-community";
import { useQuery } from "@tanstack/react-query";
import { fetchOlympicWinners } from "../../api/api";

ModuleRegistry.registerModules([
  NumberFilterModule,
  TextFilterModule,
  ClientSideRowModelModule,
]);

const AggregationTable = () => {
  const gridRef = useRef(null);

  // const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs] = useState([
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },
    { field: "sport", filter: "agTextColumnFilter", floatingFilter: true },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
    }),
    []
  );

  const autoGroupColumnDef = useMemo(
    () => ({
      minWidth: 300,
    }),
    []
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["olympicWinners"],
    queryFn: fetchOlympicWinners,
    refetchOnWindowFocus: false,
  });

  const onGridReady = useCallback(
    (params) => {
      if (isLoading) {
        params.api.showLoadingOverlay();
      } else if (isError) {
        params.api.showNoRowsOverlay();
      } else {
        params.api.hideOverlay();
      }

      params.api.setFilterModel({
        sport: {
          type: "contains",
          filter: "Swimming",
        },
      });
    },
    [isLoading, isError]
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="aggregation-wrapper">
        <div style={{ height: "500px", width: "100%" }} className="ag-theme-alpine">
          <h1>Aggregation</h1>
          <AgGridReact
            ref={gridRef}
            rowData={data || []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            groupIncludeTotalFooter={true}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );
};

export default AggregationTable;
