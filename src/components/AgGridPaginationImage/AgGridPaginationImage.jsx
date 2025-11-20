import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGamesData } from "../../api/api";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, ClientSideRowModelModule, PaginationModule } from "ag-grid-community";
import CustomHeader from "../CustomHeader/CustomHeader";
import TableSkeleton from "./TableSkeleton"; 
import Images from "../../assets/Images/index";
import "./AgGridPaginationImage.css";

ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule]);

const HelloCountryRenderer = ({ value }) => {
  const imgSrc = Images[value]; 

  return (
    <div className="image-container" title={value}>
      {imgSrc ? (
        <img src={imgSrc} alt={value} style={{ width: 25, height: 16 }} />
      ) : (
        <span style={{ fontWeight: "bold" }}>{value.slice(0, 2).toUpperCase()}</span>
      )}
      <span>{value}</span>
    </div>
  );
};

const initialGroupOrderComparator = (params) =>
  params.nodeA.allLeafChildren.length - params.nodeB.allLeafChildren.length;


const firstRowTooltip = ({value}) => {
  <div className="image-container" title={value}>
    <span>{value}</span>
  </div>
};

export default function AgGridPaginationImage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGamesData,
    refetchOnWindowFocus: false,
  });

  const suppressAggFilteredOnly=true;  

  const columnDefs = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      headerComponent: CustomHeader,
      sortable: true,
      headerTooltip: "This is the row number"
    },
    { headerName: "Athlete", field: "Athlete", headerComponent: CustomHeader, sortable: true,},
    {
      headerName: "Country",
      field: "Country",
      cellRenderer: HelloCountryRenderer,
      headerComponent: CustomHeader,
      sortable: true,
      tooltipValueGetter: firstRowTooltip,
    },
    { headerName: "Age", field: "Age", headerComponent: CustomHeader, sortable: true },
    { headerName: "Year", field: "Year", headerComponent: CustomHeader, sortable: true },
    { headerName: "Date", field: "Date", headerComponent: CustomHeader, sortable: true },
    { headerName: "Sport", field: "Sport", headerComponent: CustomHeader, sortable: true },
    { headerName: "Gold", field: "Gold", headerComponent: CustomHeader, sortable: true },
    { headerName: "Silver", field: "Silver", headerComponent: CustomHeader, sortable: true },
    { headerName: "Bronze", field: "Bronze", headerComponent: CustomHeader, sortable: true },
    { headerName: "Total", field: "Total", headerComponent: CustomHeader, sortable: true },
  ];

  if (isLoading) return <TableSkeleton rows={10} columns={columnDefs.length} />;
  if (error) return <div>Error data: {error.message}</div>;

  const rowData = data?.data?.Games || data?.data || [];

  return (
    <div className="grid-container">
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          rowHeight={40}
          headerHeight={40}
          tooltipShowDelay={0} 
          enableBrowserTooltips={false} 
          initialGroupOrderComparator={initialGroupOrderComparator}
          components={{
            customHeader: CustomHeader,  
          }}
          suppressAggFilteredOnly={suppressAggFilteredOnly}
        />
      </div>
    </div>
  );
}
