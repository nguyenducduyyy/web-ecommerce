const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/ProductContronller')

const upload = require('../../middleware/upload');
const ImageProductController = require('../../controllers/ImageProductController');
router.get('/', ProductController.show);
router.post('/create' , ProductController.store);

router.post('/upload',upload.array('images'), ImageProductController.createImageProduct)



module.exports = router;