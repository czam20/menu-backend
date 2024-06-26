import express from "express";
import RestaurantModel from "../../models/Restaurant.mjs";
const router = express.Router();

router.post("/:restaurantId/plate", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);

    if (!restaurant) {
      res.status(404).send({ error: "Restaurante no encontrado" });
      return;
    }

    const newPlate = restaurant.plates.create(req.body);

    restaurant.plates.push(newPlate);
    await restaurant.save();

    res.status(201).send({
      message: "Plato creado",
      plate: newPlate,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.get("/:restaurantId/plate", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);

    if (!restaurant) {
      res.status(404).send({ error: "Restaurante no encontrado" });
      return;
    }

    res.status(200).send({
      plates: restaurant.plates,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.get("/:restaurantId/plate/:plateId", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);

    if (!restaurant) {
      res.status(404).send({ error: "Restaurante no encontrado" });
      return;
    }

    const plate = restaurant.plates.id(req.params.plateId);

    res.status(200).send({
      plate,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.put("/:restaurantId/plate/:plateId", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);

    if (!restaurant) {
      res.status(404).send({ error: "Restaurante no encontrado" });
      return;
    }

    restaurant.plates.id(req.params.plateId).name = req.body.name;
    restaurant.plates.id(req.params.plateId).description = req.body.description;
    restaurant.plates.id(req.params.plateId).price = req.body.price;
    restaurant.plates.id(req.params.plateId).ingredients = req.body.ingredients;
    restaurant.plates.id(req.params.plateId).categories = req.body.categories;
    restaurant.plates.id(req.params.plateId).isRecommendation =
      req.body.isRecommendation;
    restaurant.plates.id(req.params.plateId).active = req.body.active;

    await restaurant.save();

    const plate = restaurant.plates.id(req.params.plateId);
    res.status(200).send({
      plate,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.delete("/:restaurantId/plate/:plateId", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);

    if (!restaurant) {
      res.status(404).send({ error: "Restaurante no encontrado" });
      return;
    }

    restaurant.plates.id(req.params.plateId).deleteOne();
    await restaurant.save();

    res.status(200).send({
      message: "El plato ha sido eliminado",
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.post("/:restaurantId/order", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);

    if (!restaurant) {
      res.status(404).send({ error: "Restaurante no encontrado" });
      return;
    }

    const newOrder = restaurant.orders.create(req.body);

    restaurant.orders.push(newOrder);
    await restaurant.save();

    res.status(201).send({
      message: "Pedido creado",
      orderId: newOrder.id
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.get("/:restaurantId/order/", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);

    if (!restaurant) {
      res.status(404).send({ error: "Restaurante no encontrado" });
      return;
    }

    res.status(200).send({
      orders: restaurant.orders,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.get("/:restaurantId/order/:orderId", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);

    if (!restaurant) {
      res.status(404).send({ error: "Restaurante no encontrado" });
      return;
    }

    const order = restaurant.orders.id(req.params.orderId);

    res.status(200).send({
      order,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

router.put("/:restaurantId/order/:orderId", async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.restaurantId);

    if (!restaurant) {
      res.status(404).send({ error: "Restaurante no encontrado" });
      return;
    }

    restaurant.orders.id(req.params.orderId).plates = req.body.plates;
    restaurant.orders.id(req.params.orderId).client = req.body.client;
    restaurant.orders.id(req.params.orderId).table = req.body.table;
    restaurant.orders.id(req.params.orderId).confirmed = true;

    await restaurant.save();

    const order = restaurant.orders.id(req.params.orderId);
    res.status(200).send({
      order,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

export { router as RestaurantRouter };
