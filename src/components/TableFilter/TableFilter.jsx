import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchOlympicData } from '../../api/api';
import './TableFilter.css';

export default function TableFilter() {
  const gridRef = useRef();
  const [columnDefs] = useState([
    { field: 'athlete', filter: true },
    { field: 'year', filter: 'agNumberColumnFilter' },
    { field: 'age', filter: 'agNumberColumnFilter' },
    { field: 'country', filter: true },
    { field: 'date', filter: true },
    { field: 'sport', filter: true },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
    { field: 'total', filter: 'agNumberColumnFilter' }
  ]);

 
 const { data: rowData, isLoading, error } = useQuery({
  queryKey: ['olympicData'],
  queryFn: fetchOlympicData
});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%', marginTop: '80px' }}>
      <h1>Default Filter UI :</h1>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        defaultColDef={{ sortable: true,
                    filter: true,
                    floatingFilter: true,   
                    resizable: true }}
        pagination={true}
        paginationPageSize={20}
        popupParent={document.body}
      />
    </div>
  );
}
