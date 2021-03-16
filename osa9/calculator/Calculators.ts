export const calculateBmi = (height: number, weight: number) => {
  const bmiValue = weight/((height/100)*(height/100));
  if(bmiValue< 18.5) return "Underweight (not healthy)";
  if(bmiValue<25) return "Normal (healthy weight)";
  if(bmiValue<30) return "Overweight (not healthy)";
  return "Obese (not healthy)";
};

interface ReturnValue {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: Array<number>, target: number): ReturnValue => {
  const trainingDays = hours.filter(hour => hour>0).length;
  const periodLength = hours.length;
  const average = hours.reduce((sum, curr) => sum+curr,0)/periodLength;
  const ratingDescription = average>target ? "Great job" : "Not too bad but could be better";
  const success = average>target ? true : false;
  const rating = Math.round(average);
  return({
    periodLength, trainingDays, success, rating,
    ratingDescription, average, target
  });
};