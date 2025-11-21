export function calculateTotals(rows = [], numericFields = []) {
  if (!rows || rows.length === 0) {
    const emptyTotals = {};
    numericFields.forEach((field) => (emptyTotals[field] = 0));
    return emptyTotals;
  }

  return rows.reduce((acc, row) => {
    numericFields.forEach((field) => {
      acc[field] = (acc[field] || 0) + (row[field] || 0);
    });
    return acc;
  }, {});
}