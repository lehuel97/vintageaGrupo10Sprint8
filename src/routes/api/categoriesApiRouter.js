const express = require('express');
const router = express.Router();
const categoriesAPIController = require('../../controller/api/categoriesApiController');

router.get('/', categoriesAPIController.list);
router.get('/count', categoriesAPIController.count);
router.get('/:id', categoriesAPIController.detail);



module.exports = router;