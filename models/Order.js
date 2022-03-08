const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");
const ErrorResponse = require("../utils/errorResponse");

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
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
  quantity: {
    type: Number,
    required: [true, "The quantity must be a positive number"],
    min: 0,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  orderTotal: {
    type: Number,
  },
  orderUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.pre("save", async function (next) {
  try {
    const product = await Product.findById(this.productId);
    console.log(product);
    if (this.quantity > product.quantity) {
      return new ErrorResponse(400, "Not enough quantity");
    }
    this.orderTotal = product.price * this.quantity;
    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("Order", OrderSchema);
