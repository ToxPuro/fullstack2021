import { calculateExercises } from './Calculators';

if(process.argv.length<4){
  throw new Error("too few parameters");
}
const target = Number(process.argv[2]);
process.argv.splice(0,3);
const hours: Array<number> = process.argv.map(hour => Number(hour));

if(isNaN(target)){
  throw new Error("target needs to be a number");
}

if(hours.filter(hour => isNaN(hour)).length>0){
  throw new Error("please enter only numbers for exercise hours");
}

console.log(calculateExercises( hours ,target));