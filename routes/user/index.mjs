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

    res.status(201).send({
      message: "Mesero creado",
      user: newUser,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export { router as UserRouter };
