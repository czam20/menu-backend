import express from "express";
import UserModel from "../../models/User.mjs";
const router = express.Router();

router.post("/restaurant/:id/waiter", async (req, res) => {
  try {
    const newUser = new UserModel({
      ...req.body,
      rol: "waiter",
      restaurant: req.params.id,
    });
    await newUser.save();

    const { password, ...user } = newUser._doc;

    res.status(201).send({
      message: "Mesero creado",
      user,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/restaurant/:id/waiter", async (req, res) => {
  try {
    const waiters = await UserModel.find({ restaurant: req.params.id, rol: "waiter" }).select([
      "-password",
    ]);
    res.status(200).send({
      waiters,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/restaurant/:id/owner", async (req, res) => {
  try {
    const owner = await UserModel.findOne({ restaurant: req.params.id, rol: "owner" }).select([
      "-password",
    ]);
    res.status(200).send({
      owner,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/restaurant/:id", async (req, res) => {
  try {
    const users = await UserModel.find({ restaurant: req.params.id }).select([
      "-password",
    ]);
    res.status(200).send({
      users,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export { router as UserRouter };
