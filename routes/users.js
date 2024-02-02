const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");



router.post('/addUserAddress', userController.addUserAddress);
router.post('/upadteUserAddress', userController.upadteUserAddress);
router.get('/getUserAddress', userController.getUserAddress);

module.exports = router;