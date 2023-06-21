const express = require("express");
const router = express.Router();


const authRouter = require("./authRouter")
const productRouter = require("./productRouter");
const homepageRouter = require("./homepageRouter");

router.use("/products", productRouter); //admin
router.use("/homepage", homepageRouter);
router.use("/auth", authRouter)



module.exports = router;
