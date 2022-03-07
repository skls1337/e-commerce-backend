const express = require('express');
const {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/orders');

const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

module.exports = router;