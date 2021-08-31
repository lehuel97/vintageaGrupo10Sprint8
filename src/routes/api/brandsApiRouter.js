const express = require('express');
const router = express.Router();
const brandsAPIController = require('../../controller/api/brandsApiController');

router.get('/', brandsAPIController.list);
router.get('/count', brandsAPIController.count);
router.get('/:id', brandsAPIController.detail);



module.exports = router;