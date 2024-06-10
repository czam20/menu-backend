import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const PlateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [String],
  },
  categories: {
    type: [String],
    enum: ["entrada", "principal", "postre", "bebida"],
    required: true,
  },
  isRecommendation: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const OrderSchema = new mongoose.Schema({
  platos: [PlateSchema],
  client: {
    fullname: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },
  totalAmmount: {
    type: Number,
    required: true,
  },
  table: {
    type: Number,
    required: true,
  },
});

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rif: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
  },
  plates: {
    type: [PlateSchema],
    default: () => ([]),
  },
  orders: {
    type: [OrderSchema],
    default: () => ([]),
  },
});

RestaurantSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
export default RestaurantModel;