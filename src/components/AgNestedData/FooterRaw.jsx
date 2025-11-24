import React from "react";
import "./AgNestedData.css";

export default function FooterRow({ footer }) {
  return (
    <div className="footer-row row-display">
      <div className="cell country-name">Footer</div>
      <div className="cell">{footer.footerYear}</div>
      <div className="cell">{footer.footerTotal}</div>
      <div className="cell">{footer.footerLabel}</div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell actions"></div>
    </div>
  );
}
