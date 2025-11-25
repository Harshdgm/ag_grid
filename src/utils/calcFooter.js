export function calcFooter(grouped) {
  if (!grouped.length) return {};

  const sameValue = (arr, key) => {
    const vals = arr.flatMap(g => g.items.map(r => r[key]));
    return vals.every(v => v === vals[0]) ? vals[0] : "";
  };

  return {
    footerYear: sameValue(grouped, "year"),
    footerLabel: sameValue(grouped, "label"),
    footerTotal: grouped.reduce((sum, g) => sum + g.total, 0),
  };
}
