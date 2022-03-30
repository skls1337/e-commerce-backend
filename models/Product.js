const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "The price mmust be a positive number"],
    min: 0,
  },
  imageUrl: {
    type: String,
  },
  quantity: {
    type: Number,
    required: [true, "The quantity must be a positive number"],
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
