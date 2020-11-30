import express from 'express';
const app = express();
import {calculateBmi} from './bmiCalculator';

app.use(express.json())

app.get('/', (_req, res) => res.send("hi threre"))

// ?height=180&weight=72
app.get('/bmi', (req, res) => {
  const h = Number(req.query.height)
  const w = Number(req.query.weight)
  if (!h || !w) {
    return res.status(400).json({error: "parameters missing"})
  }
  const result = calculateBmi(h, w)
  return res.status(200).json({
    weight: w,
    height: h,
    bmi: result
  })
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});