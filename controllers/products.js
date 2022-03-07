const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Product = require('../models/Product');

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createProduct = asyncHandler(async (req, res, next) => {
    // Add user to req,body
    req.body.user = req.user.id;

    // If the user is not an admin, they can only add one bootcamp
    if (!req.user.role in ['seller', 'admin']) {
        return next(
            new ErrorResponse(
                `The user with ID ${req.user.id} cannot publish a product`,
                400
            )
        );
    }

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        data: product
    });
});