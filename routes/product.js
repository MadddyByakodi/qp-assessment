const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");



router.get('/getProductsList', productController.getProductsList);
router.get('/getProductsdeatils', productController.getProductsdeatils);

module.exports = router;