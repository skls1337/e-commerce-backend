const express = require('express');
const {
    createProduct
} = require('../controllers/products');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();
router.use(protect);
router.use(authorize('admin'));

router
    .route('/')
    .post(createProduct);

module.exports = router;