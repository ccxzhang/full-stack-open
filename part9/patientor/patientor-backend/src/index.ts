import express from "express";
import PatientRouter from './routes/patients'

const app = express();
app.use(express.json());

const PORT = 3001;
app.use(express.static("dist"));

app.use("/api/patients", PatientRouter);

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
