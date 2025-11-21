import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../api/api";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
} from "ag-grid-community";

import CustomHeader from "../CustomHeader/CustomHeader";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AgGridPagination.css";
import OutcomeCellRenderer  from "../../utils/OutcomeCellRenderer";

ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule]);

const initialGroupOrderComparator = (params) =>
  params.nodeA.allLeafChildren.length - params.nodeB.allLeafChildren.length;

export default function AgGridPagination() {
 
  const { data, isLoading, error } = useQuery({
    queryKey: ["diabetes"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columnDefs = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      headerComponent: "customHeader",
    },
    {
      headerName: "Pregnancies",
      field: "Pregnancies",
      sortable: true,
      headerComponent: "customHeader",
    },
    {
      headerName: "Glucose",
      field: "Glucose",
      sortable: true,
      headerComponent: "customHeader",
    },
    {
      headerName: "BloodPressure",
      field: "BloodPressure",
      sortable: true,
      headerComponent: "customHeader",
    },
    {
      headerName: "BMI",
      field: "BMI",
      sortable: true,
      headerComponent: "customHeader",
    },
    {
      headerName: "Age",
      field: "Age",
      sortable: true,
      headerComponent: "customHeader",
    },
    {
      headerName: "Outcome",
      field: "Outcome",
      sortable: true,
      headerComponent: "customHeader",
      cellRenderer: OutcomeCellRenderer,
    },
  ];

  return (
    <div className="grid-container">
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <h1>Pagination & Sorting</h1>
        <AgGridReact
          rowData={data.data}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          rowHeight={35}
          headerHeight={40}
          initialGroupOrderComparator={initialGroupOrderComparator}
          components={{
            customHeader: CustomHeader,  
          }}
        />
      </div>
    </div>
  );
}
