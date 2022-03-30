const express = require("express");
const {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
  getMyOrders,
} = require("../controllers/orders");
const Order = require("../models/Order");

const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

const advancedResults = require("../middleware/advancedResults");

router.use(protect);

router.route("/").get(advancedResults(Order), getOrders).post(createOrder);

router.route("/my-orders").get(getMyOrders);

router.route("/:id").get(getOrder);

router.use(authorize("admin", "seller"));

router.route("/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
