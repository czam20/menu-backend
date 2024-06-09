import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  rol: {
    type: String,
    enum: {
      values: ["owner", "waiter"],
      message: "{VALUE} no es válido",
    },
    required: true,
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Email inválido",
    },
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  }
});

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;