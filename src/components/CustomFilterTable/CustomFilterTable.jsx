import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import GreetingFilter from "./GreetingFilter";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import AgeFilterComponent from "./AgeFilter";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function CustomFilterTable() {
  const [rowData, setRowData] = useState([]);

  const columnDefs = useMemo(() => [
    { field: "athlete", headerName: "Athlete" },
//     { field: "age",
//         filter: {
//             component: AgeFilterComponent,       
//             doesFilterPass: (params) => {
//             return params.data.age >= params.handlerParams.model.value;
//             },
//   },},
    { field: "sport", headerName: "Sport" },
    {
      headerName: "Greeting",
      cellRenderer: GreetingFilter,
      cellRendererParams: {
        colors: { Swimming: "blue", Gymnastics: "red" },
        cellStyles: { border: "1px solid #ccc", background: "#f0f0f0" },
      },
    },
  ], []);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    filter: true,
    resizable: true,
  }), []);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((res) => res.json())
      .then((data) => setRowData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}
