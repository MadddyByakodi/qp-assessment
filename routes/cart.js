const express = require("express");
const router = express.Router();

const cart = require("../controllers/cart");

router.post('/addtocart', cart.addtocart);
router.post('/updateCartQuantity', cart.updateCartQuantity);
router.post('/updateCartuser', cart.updateCartuser);
router.get('/getCartDetails', cart.getCartDetails);

module.exports = router;