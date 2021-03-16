import { calculateBmi } from './Calculators';
if (process.argv.length<4) throw new Error('too few parameters');
if (process.argv.length>4) throw new Error('too many parameters');
const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
if(isNaN(height) || isNaN(weight)){
  throw new Error('Please enter numbers');
}
console.log(calculateBmi(height, weight));
