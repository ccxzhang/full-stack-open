import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
  const height = Number(req.query?.height);
  const weight = Number(req.query?.weight);

  if (isNaN(weight) || isNaN(height)) {
    res
      .send({
        error: "malformatted parameters",
      })
      .status(400);
  }

  const bmi = calculateBmi(height, weight);
  res
    .send({
      height,
      weight,
      bmi,
    })
    .status(200);
});

app.post("/exercises", (req, res) => {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyExercises: number[] = req.body.daily_exercises as number[];
  const target: number= req.body.target as number;

  if (!target || !dailyExercises) {
    res.status(400).send({ error: "parameters missing" });
  }

  if (isNaN(target) || dailyExercises.some(isNaN)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(target, dailyExercises);
  res.status(200).send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
