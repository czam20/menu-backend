import express from "express";
import UserModel from "../../models/User.mjs";
const router = express.Router();

router.post("/waiter", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();

    res.status(201).send({
      message: "User created",
      user: newUser,
    });
  } catch (error) {}
});

export { router as UserRouter };
