import "./loadEnvironment.mjs";
import express from "express";
import connectDB from "./config/db.mjs";

const app = express();

connectDB(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen on http://localhost:${process.env.PORT}`);
});
