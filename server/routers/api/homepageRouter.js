const express = require('express');
const router = express.Router();
const HomePageContronller = require('../../controllers/HomePageContronller');
// const { default: Home } = require('../../../client/src/Components/Home');

router.get('/products/:id',HomePageContronller.viewProduct)
router.get('/',HomePageContronller.showNewArrial)

module.exports = router;