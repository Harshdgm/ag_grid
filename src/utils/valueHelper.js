
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min, max) {
  return +(Math.random() * (max - min) + min).toFixed(1);
}

export function randomOutcome() {
  return Math.random() < 0.3 ? 1 : 0; 
}
