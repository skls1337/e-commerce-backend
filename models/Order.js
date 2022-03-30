const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");
const ErrorResponse = require("../utils/errorResponse");

const OrderSchema = new mongoose.Schema({
  shippingAddress: {
    type: String,
    required: [true, "Please add the shipping address"],
    maxlength: [500, "Description can not be more than 500 characters"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Please provide a country"],
    minlength: [0, "The country is invalid"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please add a phone number"],
    length: [10, "Invalid phone number"],
    trim: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: [true, "The quantity must be a positive number"],
        min: 0,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
