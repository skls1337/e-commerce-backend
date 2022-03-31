const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  testProduct,
} = require("../controllers/products");
const Product = require("../models/Product");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(advancedResults(Product), getProducts)
  .post(protect, authorize("admin", "seller"), createProduct);

router.route("/test").post(protect, authorize("admin", "seller"), testProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("admin", "seller"), updateProduct)
  .delete(protect, authorize("admin", "seller"), deleteProduct);
module.exports = router;
