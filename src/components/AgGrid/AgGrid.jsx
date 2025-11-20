import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { fetchData } from "../../api/api";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import OutcomeCellRenderer from "../../utils/OutcomeCellRenderer";
import "./AgGrid.css";
import CustomHeader from "../CustomHeader/CustomHeader";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function AgGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["diabetes"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const rowData = data.data;

  const columnDefs = [
    { headerName: "No", valueGetter: "node.rowIndex + 1" },
    { headerName: "Pregnancies", field: "Pregnancies",headerComponent: CustomHeader },
    { headerName: "Glucose", field: "Glucose",headerComponent: CustomHeader},
    { headerName: "BloodPressure", field: "BloodPressure" ,headerComponent: CustomHeader},
    { headerName: "BMI", field: "BMI",headerComponent: CustomHeader},
    { headerName: "Age", field: "Age",headerComponent: CustomHeader},
    { headerName: "Outcome", field: "Outcome", cellRenderer: OutcomeCellRenderer,headerComponent: CustomHeader,},
  ];

  return (
    <div className="diabetes-container">
      <h1>AgGrid with Virtualization</h1>
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%" }} 
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowHeight={35}              
          headerHeight={40}          
          domLayout="normal"          
          suppressRowVirtualisation={false} 
          animateRows={true}   
          // suppressServerSideFullWidthLoadingRow={true}     
        />
      </div>
    </div>
  );
}
