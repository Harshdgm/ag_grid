import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TableSkeleton({ rows = 10, columns = 11 }) {
  const skeletonRows = Array.from({ length: rows });

  return (
    <div className="grid-container">
      <div className="ag-theme-alpine" style={{ maxHeight: 400, maxWidth: 1080, overflow: "hidden" }}>
        {skeletonRows.map((_, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              padding: "8px 0",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} width={180} height={40} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
