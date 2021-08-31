const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator')
const validations = require('../middlewares/productValidation');
const isAdmin = require('../middlewares/adminLoggedValidation');


const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/img/products'),
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});




const upload = multer({ storage })






router.get('/listar', productController.list)

//router.get('/listarborrado', productController.listarDelete)

router.get('/edit/:id', productController.edit)

router.get('/detail/:id', productController.detail)

router.get('/create', upload.fields([{name:'image'},{name:'image2'},{name:'image3'}]), validations, isAdmin, productController.create)

router.post('/store', upload.fields([{name:'image'},{name:'image2'},{name:'image3'}]), validations, isAdmin, productController.store);

router.put('/:id', upload.fields([{name:'image'},{name:'image2'},{name:'image3'}]), validations, isAdmin, productController.update);

//router.put('/:id/recover', productController.recover);

router.delete('/:id', isAdmin, productController.destroy);

module.exports = router;