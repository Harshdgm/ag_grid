import asDate from "../components/ExternalFilter/rowDate";

export const isExternalFilterPresent = (ageType) => ageType !== "everyone";

export const doesExternalFilterPass = (ageType, node) => {
  if (!node.data) return true;

  switch (ageType) {
    case "below25":
      return node.data.age < 25;
    case "between25and50":
      return node.data.age >= 25 && node.data.age <= 50;
    case "above50":
      return node.data.age > 50;
    case "dateAfter2008":
      return asDate(node.data.date) > new Date(2008, 0, 1);
    default:
      return true;
  }
};
