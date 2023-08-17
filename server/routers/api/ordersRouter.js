const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");


router.get("/",orderController.getOrder)
router.post("/create", orderController.createOrder);
router.put("/update-status" ,orderController.updateOrderStatus)

module.exports = router;