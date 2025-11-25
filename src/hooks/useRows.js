import { useState, useEffect } from "react";
import { calcLabel } from "../utils/player";

export default function useRows(storageKey, initialRows) {
  const [rows, setRows] = useState(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);

    return initialRows.map(r => ({
      ...r,
      wins: r.wins ?? 0,
      fails: r.fails ?? 0,
      total: (r.wins ?? 0) + (r.fails ?? 0),
      label: calcLabel(r.wins ?? 0, r.fails ?? 0),
    }));
  });

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(rows));
  }, [rows, storageKey]);

  return [rows, setRows];
}
