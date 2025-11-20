import {randomInt,randomFloat, randomOutcome} from "./valueHelper";

export function generateDiabetesData(totalRows = 120000) {
  const data = [];
  for (let i = 0; i < totalRows; i++) {
    data.push({
      id: i + 1,
      Pregnancies: randomInt(0, 10),
      Glucose: randomInt(70, 200),
      BloodPressure: randomInt(50, 120),
      BMI: randomFloat(18, 40),
      Age: randomInt(21, 80),
      Outcome: randomOutcome(),
    });
  }
  return data;
}

const bigData = generateDiabetesData();
console.log(bigData.length); 
console.log(bigData[0]); 
console.log(bigData[139999]); 
