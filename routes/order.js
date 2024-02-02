const express = require("express");
const router = express.Router();

const orderController = require('../controllers/order');

router.post('/placeOrder', orderController.placeOrder);
router.get('/getOrderDeatils', orderController.getOrderDeatils);

module.exports = router; 