import express from 'express';
import { calculateBmi, calculateExercises } from './Calculators';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try{
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if(isNaN(weight) || isNaN(height)){
      res.status(400).send({error: "malformatted parameters"});
    }
    res.send({
      weight, height,
      bmi: calculateBmi(height, weight)
    });
  }
  catch (exception) {
    res.status(400).send({error: "malformatted parameters"});
  }

});

app.post('/exercises', (req, res) => {
  try{
    if(!req.body.daily_exercises || !req.body.target){
      res.status(400).send({error: "parameters missing"});
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const daily_exercises: Array<number> = req.body.daily_exercises.map((exercise: any) => Number(exercise));
    const target =  Number(req.body.target);
    if(daily_exercises.filter(hours => isNaN(hours)).length>0){
      res.status(400).send({error: "malformatted parameters"});
    }
    if(isNaN(target)){
      res.status(400).send({error: "malformatted parameters"});
    }
    const result = calculateExercises(daily_exercises, target);
    res.send(result);
  }
  catch (expection) {
    res.status(400).send({error: "malformatted parameters"});
  }

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});