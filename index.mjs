import "./loadEnvironment.mjs";
import express from "express";
import connectDB from "./config/db.mjs";
import { UserRouter } from "./routes/user/index.mjs";
import { RestaurantRouter } from "./routes/restaurant/index.mjs";
import { AuthRouter } from "./routes/auth/index.mjs";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", UserRouter);
app.use("/api/restaurant", RestaurantRouter);
app.use("/api/auth", AuthRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listen on http://localhost:${process.env.PORT}`);
});
