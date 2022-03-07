const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc      Create new bootcamp
// @route     POST /api/v1/order
// @access    Private
exports.createOrder = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.body.productId);
    if (product) {
        return new ErrorResponse(404, 'Product not found')
    }
    const order = Order.create(req.body)

    res.status(201).json({
        success: true,
        data: order
    });
});