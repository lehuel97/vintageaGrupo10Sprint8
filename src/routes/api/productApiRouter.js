const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controller/api/productApiController');

router.get('/', productsAPIController.list);
router.get('/count', productsAPIController.count);
router.get('/latest', productsAPIController.latest);
router.get('/categories',productsAPIController.categoriesCount)
router.get('/brands',productsAPIController.brandsCount)
router.get('/:id', productsAPIController.detail);




module.exports = router;