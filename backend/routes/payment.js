const express = require("express");

const { createOrder } = require("../controllers/paymentController");
const { validateCreateOrder } = require("../middleware/validateRequest");

const router = express.Router();

router.post("/create-order", validateCreateOrder, createOrder);

module.exports = router;