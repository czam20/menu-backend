import express from "express";
import RestaurantModel from "../../models/Restaurant.mjs";
import UserModel from "../../models/User.mjs";
const router = express.Router();

// TODO: encriptar password
router.post("/register", async (req, res) => {
  try {
    const newRestaurant = new RestaurantModel(req.body.restaurant);
    await newRestaurant.save();

    const newUser = new UserModel({
      ...req.body.user,
      rol: "owner",
      restaurant: newRestaurant._id,
    });
    await newUser.save();

    const {password, ...user} = newUser._doc;
    
    res.status(201).send({
      message: "Restaurante creado con exito",
      user,
      restaurant: newRestaurant,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).populate("restaurant")

    if (!user) {
      res.status(404).send({ error: "Usuario no registrado" });
    } else if (user.password === req.body.password) {
      const {password, ...userLogged} = user._doc
      res.status(200).send({
        user: userLogged,
      });
    } else {
      res.status(400).send({
        error: "Credenciales invalidas",
      });
    }
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

export { router as AuthRouter };
