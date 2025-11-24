export const calcLabel = (wins, fails) => {
  if (wins > fails) return "Good Player";
  if (fails > wins) return "Average Player";
  return "Neutral";
};