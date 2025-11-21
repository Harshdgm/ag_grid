// "use client";

// import React, { useMemo } from "react";
// import { AgGridReact } from "ag-grid-react";

// // AG-Grid styles
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// // AG-Grid modules (ENTERPRISE)
// import {
//   ClientSideRowModelModule,
//   ModuleRegistry,
// } from "ag-grid-community";

// import {
//   RowGroupingModule,
//   ColumnMenuModule
// } from "ag-grid-enterprise";

// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   RowGroupingModule,
//   ColumnMenuModule
// ]);

// import * as gamesData from "../../data/games.json";


// const GamesTable = () => {

//   const columnDefs = useMemo(() => [
//     { field: "Country", rowGroup: true},
//     { field: "Athlete" },
//     { field: "Sport" },
//     { field: "Age" },
//     { field: "Year" },
//     { field: "Date" },
//     { field: "Gold", aggFunc: "sum" },
//     { field: "Silver", aggFunc: "sum" },
//     { field: "Bronze", aggFunc: "sum" },
//     { field: "Total", aggFunc: "sum" },
//   ], []);

//   const defaultColDef = useMemo(() => ({
//     flex: 1,
//     minWidth: 120,
//     sortable: true,
//     filter: true,
//   }), []);

//   const autoGroupColumnDef = useMemo(() => ({
//     headerName: "Country",
//     minWidth: 240,
//     cellRendererParams: {
//       suppressCount: false,
//     }
//   }), []);

//   return (
//     <div className="ag-theme-alpine" style={{ height: 600, width: "100%", marginTop: 40 }}>
//       <h2 style={{marginBottom: 10}}>Row Grouping (Country)</h2>

//       <AgGridReact
//         rowData={gamesData.default} // <-- Perfect match
//         columnDefs={columnDefs}
//         defaultColDef={defaultColDef}
//         autoGroupColumnDef={autoGroupColumnDef}
//         groupDisplayType="groupRows"
//         animateRows={true}
//         pagination={true}
//         paginationPageSize={20}
//       />
//     </div>
//   );
// };

// export default GamesTable;
import React from 'react'

export default function GamesTable() {
  return (
    <div>GamesTable</div>
  )
}
