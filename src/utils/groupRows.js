import { sortItems } from "./sortRows";

export function groupRows(rows, search, sortConfig) {
  const s = search.toLowerCase();

  const filtered = rows.filter(r =>
    r.athlete.toLowerCase().includes(s) ||
    r.country.toLowerCase().includes(s) ||
    String(r.year).includes(s) ||
    String(r.total).includes(s) ||
    r.label.toLowerCase().includes(s)
  );

  const map = {};
  filtered.forEach(r => {
    if (!map[r.country]) map[r.country] = [];
    map[r.country].push(r);
  });

  return Object.entries(map).map(([country, items]) => {
    const sortedItems = sortItems(items, sortConfig);

    const years = sortedItems.map(r => r.year);
    const labels = sortedItems.map(r => r.label);

    return {
      country,
      items: sortedItems,
      total: sortedItems.reduce((sum, r) => sum + r.total, 0),
      commonYear: years.every(y => y === years[0]) ? years[0] : "",
      commonLabel: labels.every(l => l === labels[0]) ? labels[0] : "",
    };
  });
}
