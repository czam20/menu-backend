import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const PlateSchema = new mongoose.Schema({
  photo: {
    type: String
  },
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
  platos: {
    type: String,
    required: true
  },
  client: {
    fullname: {
      type: String,
    },
    dni: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  table: {
    type: Number,
  },
  confirmed: {
    type: Boolean
  }
});

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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