const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controller/userController');
const path = require('path');
//const auth = require('../middlewares/authMiddleware');


const guestMiddleware = require('../middlewares/guestMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const loggedMiddleware = require('../middlewares/loggedMiddleware')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/imageUser'))
    },
    filename: (req, file, cb) => {
        const newFileName = 'usuario' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }
});

const validations = require('../middlewares/usersValidation');

const upload = multer({ storage });

function testing(req,res){
    let user = res.locals.userLogged.dataValues
    console.log('aca se viene el user ')
    console.log(user)
    res.render(path.resolve(__dirname, '..', 'views', 'profile'),{user})
}


router.get('/registro', loggedMiddleware, userController.register);

router.post('/registro', upload.single('imagenAvatar'), validations, userController.processRegister);

router.get('/inicio-sesion', loggedMiddleware, userController.login);

router.post('/inicio-sesion', userController.loginProcess);


router.get('/profile', guestMiddleware,userController.perfil);

router.get('/logout', guestMiddleware, userController.logout);

router.get('/edit', userController.edit);

router.post('/edited', userController.update, validations)

module.exports = router












//router.get('/admintable', userController.table)
//router.get('/adminlistar', userController.listar)*/