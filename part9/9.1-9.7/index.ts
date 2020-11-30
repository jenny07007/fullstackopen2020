import express from 'express';
const app = express();
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator'

app.use(express.json());

app.get('/', (_req, res) => res.send("hi threre"));

// ?height=180&weight=72
app.get('/bmi', (req, res) => {
  const h = Number(req.query.height);
  const w = Number(req.query.weight);
  if (!h || !w) {
    return res.status(400).json({error: "parameters missing"});
  }
  const result = calculateBmi(h, w);
  return res.status(200).json({
    weight: w,
    height: h,
    bmi: result
  });
});

/*
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
*/

app.post('/exercise', (req, res) => {
  const {daily_exercises, target} = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({error: "parameters missing"})
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({error: "malformatted parameters"})
  }

  const over24 = daily_exercises.some(h => h > 24);
  if (over24) {
    return res.status(400).json({error: "malformatted parameters"})
  }

  return res.json(calculateExercises(daily_exercises, target))

});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});