import React, { useState, useRef} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../api/api";
import "./DiabetesTableJS.css";

export default function DiabetesTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["diabetes"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  const containerRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);
  const rowHeight = 50;
  const visibleRows = 12; 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const rows = data.data;
  const totalHeight = rows.length * rowHeight;

  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = Math.min(startIndex + visibleRows, rows.length);
  const paddingTop = startIndex * rowHeight;
  const paddingBottom = totalHeight - paddingTop - (endIndex - startIndex) * rowHeight;

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className="diabetes-container">
      <h1>Diabetes Data (Virtualized)</h1>
      <div
        className="diabetes-table-wrapper"
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: `${rowHeight * visibleRows}px`, overflowY: "auto" }}
      >
        <table className="diabetes-table">
          <thead>
            <tr>
              <th>No.of Data</th>
              <th>Pregnancies</th>
              <th>Glucose</th>
              <th>BloodPressure</th>
              <th>BMI</th>
              <th>Age</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr style={{ height: `${paddingTop}px` }}>
                <td colSpan={7}></td>
              </tr>
            )}

            {rows.slice(startIndex, endIndex).map((item, index) => (
              <tr key={startIndex + index} style={{ height: `${rowHeight}px` }}>
                <td>{startIndex + index + 1}</td>
                <td>{item.Pregnancies}</td>
                <td>{item.Glucose}</td>
                <td>{item.BloodPressure}</td>
                <td>{item.BMI}</td>
                <td>{item.Age}</td>
                <td>{item.Outcome}</td>
              </tr>
            ))}

            {paddingBottom > 0 && (
              <tr style={{ height: `${paddingBottom}px` }}>
                <td colSpan={7}></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
