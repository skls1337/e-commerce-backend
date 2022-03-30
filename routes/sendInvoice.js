const express = require("express");
const { sendInvoice } = require("../controllers/sendInvoice");

const router = express.Router();

const { protect } = require("../middleware/auth");
router.post("/send-invoice", sendInvoice);

module.exports = router;
