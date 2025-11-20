import React from "react";
import { useQuery } from "@tanstack/react-query";
import { List, AutoSizer } from "react-virtualized";
import { fetchData } from "../../api/api";
import "./DiabetesTable.css";

export default function DiabetesTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["diabetes"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const rows = data.data;
  const rowHeight = 50;

  const rowRenderer = ({ index, key, style }) => {
    const item = rows[index];
    return (
      <div key={key} style={style} className="table-row">
        <div className="table-cell">{index + 1}</div>
        <div className="table-cell">{item.Pregnancies}</div>
        <div className="table-cell">{item.Glucose}</div>
        <div className="table-cell">{item.BloodPressure}</div>
        <div className="table-cell">{item.BMI}</div>
        <div className="table-cell">{item.Age}</div>
        <div className="table-cell">{item.Outcome}</div>
      </div>
    );
  };

  return (
    <div className="diabetes-container">
      <h1>Diabetes Data</h1>
      <div className="table-wrapper">
        <div className="table-header">
          <div className="table-cell">No.of Data</div>
          <div className="table-cell">Pregnancies</div>
          <div className="table-cell">Glucose</div>
          <div className="table-cell">BloodPressure</div>
          <div className="table-cell">BMI</div>
          <div className="table-cell">Age</div>
          <div className="table-cell">Outcome</div>
        </div>
        <div className="table-body">
          <AutoSizer disableWidth>
            {({ height }) => (
              <List
                width={913} 
                height={height}
                rowCount={rows.length}
                rowHeight={rowHeight}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
}
