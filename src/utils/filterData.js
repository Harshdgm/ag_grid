import { doesExternalFilterPass } from "./filter";

export function filterRows(rows = [], searchText = "", ageType = "everyone") {
  if (!rows || rows.length === 0) return [];

  return rows.filter((row) => {
    const matchesSearch = searchText
      ? Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      : true;

    const matchesAgeFilter = doesExternalFilterPass(ageType, { data: row });

    return matchesSearch && matchesAgeFilter;
  });
}
