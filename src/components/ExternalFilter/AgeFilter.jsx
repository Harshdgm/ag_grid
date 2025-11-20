import React from "react";
import "./ExternalFilter.css"

const AgeFilter = ({ onFilterChange }) => {
  return (
    <div className="test-header">
      <label>
        <input
          type="radio"
          name="filter"
          id="everyone"
          onChange={() => onFilterChange("everyone")}
        />
        Everyone
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          id="below25"
          onChange={() => onFilterChange("below25")}
        />
        Below 25
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          id="between25and50"
          onChange={() => onFilterChange("between25and50")}
        />
        Between 25 and 50
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          id="above50"
          onChange={() => onFilterChange("above50")}
        />
        Above 50
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          id="dateAfter2008"
          onChange={() => onFilterChange("dateAfter2008")}
        />
        After 01/01/2008
      </label>
    </div>
  );
};

export default AgeFilter;
