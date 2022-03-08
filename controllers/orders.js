const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// @desc      Get all orders
// @route     GET /api/v1/orders
// @access    Public
exports.getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single order
// @route     GET /api/v1/orders/:id
// @access    Public
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: order });
});

// @desc      Create new order
// @route     POST /api/v1/orders
// @access    Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  req.body.orderUserId = req.user.id;
  const product = await Product.findById(req.body.productId);
  const user = await User.findById(req.body.orderUserId);
  if (!product || !user) {
    return next(new ErrorResponse(`User or product not found`, 404));
  }

  if (req.body.quantity > product.quantity) {
    return next(new ErrorResponse(`Insuficient quantity`, 403));
  }

  const order = await Order.create(req.body);

  res.status(201).json({
    success: true,
    data: order,
  });
});

// @desc      Update order
// @route     PUT /api/v1/orders/:id
// @access    Private
exports.updateOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
    );
  }
  if (req.body.productId) {
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return next(
        new ErrorResponse(
          `Product not found with id of ${req.body.productId}`,
          404
        )
      );
    }
  }

  if (req.body.orderUserId) {
    const user = await User.findById(req.body.orderUserId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
  }

  order = await Order.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: order });
});

// @desc      Create new order
// @route     DELETE /api/v1/order/:id
// @access    Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: {},
  });
});
