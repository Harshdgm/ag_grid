import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisV, FaSortUp, FaSortDown } from "react-icons/fa";
import "./CustomHeader.css";

const CustomHeader = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const sortAsc = (e) => {
    const multiSort = !!(e && e.shiftKey);
    if (typeof props.setSort === "function") {
      props.setSort("asc", multiSort);
    } else if (props.columnApi && props.column) {
      props.columnApi.applyColumnState({
        defaultState: { sort: null },
        state: [{ colId: props.column.getColId(), sort: "asc" }],
      });
    }
    setShowMenu(false);
  };

  const sortDesc = (e) => {
    const multiSort = !!(e && e.shiftKey);
    if (typeof props.setSort === "function") {
      props.setSort("desc", multiSort);
    } else if (props.columnApi && props.column) {
      props.columnApi.applyColumnState({
        defaultState: { sort: null },
        state: [{ colId: props.column.getColId(), sort: "desc" }],
      });
    }
    setShowMenu(false);
  };

  const clearSort = (e) => {
    const multiSort = !!(e && e.shiftKey);
    if (typeof props.setSort === "function") {
      props.setSort(null, multiSort);
    } else if (props.columnApi && props.column) {
      props.columnApi.applyColumnState({
        defaultState: { sort: null },
        state: [{ colId: props.column.getColId(), sort: null }],
      });
    }
    setShowMenu(false);
  };

  useEffect(() => {
    const handleOutside = (e) => {
      const clickedButton = buttonRef.current?.contains(e.target);
      const clickedMenu = menuRef.current?.contains(e.target);

      if (!clickedButton && !clickedMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggleMenu = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="custom-header">
      <span className="column-title">{props.displayName}</span>

      <FaEllipsisV
        size={13}
        ref={buttonRef}
        className="three-dot"
        onClick={toggleMenu}
      />

      {showMenu &&
        createPortal(
          <div
            ref={menuRef}
            className="menu-data"
            style={{
              top: menuPos.top,
              left: menuPos.left,
            }}
          >
            <div
              className="sort-data"
              onClick={(e) => {
                e.stopPropagation();
                sortAsc(e);
              }}
            >
              <FaSortUp /> Ascending
            </div>

            <div
              className="sort-data"
              onClick={(e) => {
                e.stopPropagation();
                sortDesc(e);
              }}
            >
              <FaSortDown /> Descending
            </div>

            <div
              className="sort-data"
              onClick={(e) => {
                e.stopPropagation();
                clearSort(e);
              }}
            >
              Clear Sort
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CustomHeader;
