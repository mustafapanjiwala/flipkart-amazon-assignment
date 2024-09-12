const express = require('express');
const { migrateListings, unlistProduct, getProducts, insertProduct } = require('../controller/flipkartController');

const router = express.Router();

router.get('/get', getProducts);
router.get('/migrate', migrateListings);
router.delete('/unlist/:id', unlistProduct);
// Insert a product into MongoDB
router.post('/insert', insertProduct);

module.exports = router;