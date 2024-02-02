const express = require("express");
const router = express.Router();

const adminProductsController = require("../controllers/adminProducts");

router.post('/productadd', adminProductsController.addProduct);
router.put('/updateProduct',adminProductsController.updateProduct);
router.get('/getProducts', adminProductsController.getProducts);
router.get('/getProductsList', adminProductsController.getProductsList);
router.get('/getProductsdetails', adminProductsController.getProductsdetails);
router.delete('/deleteProduct', adminProductsController.deleteProduct)

module.exports = router;