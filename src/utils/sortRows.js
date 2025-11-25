export function sortItems(items, sortConfig) {
  if (!sortConfig.key) return items;

  return [...items].sort((a, b) => {
    let x = a[sortConfig.key];
    let y = b[sortConfig.key];

    if (typeof x === "string") x = x.toLowerCase();
    if (typeof y === "string") y = y.toLowerCase();

    if (x < y) return sortConfig.direction === "asc" ? -1 : 1;
    if (x > y) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
}
