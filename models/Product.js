const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

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
  productStripe: {
    type: Object,
  },
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.pre("save", async function (next) {
  const product = await stripe.products.create({ name: this.title });
  const unit_amount = this.price * 100;
  this.productStripe = await stripe.prices.create({
    product: product.id,
    unit_amount: unit_amount,
    currency: "RON",
  });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
