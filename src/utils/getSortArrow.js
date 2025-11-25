import { FiChevronUp, FiChevronDown } from "react-icons/fi";

export function getSortArrow(columnKey, sortConfig) {
  if (sortConfig.key !== columnKey) return null;
  return sortConfig.direction === "asc" ? FiChevronUp : FiChevronDown;
}