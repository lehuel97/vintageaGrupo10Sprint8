const path = require('path')
const { body } = require('express-validator')

    const validations = [
    body('nombre').notEmpty().withMessage('Tienes que escribir un nombre').bail()
    .isLength({ min: 3 }).withMessage('Nombre demasiado corto'),

    body('correo')
    .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
    .isEmail().withMessage('Tienes que escribir un formato de correro válido'),
    body('password')
    .notEmpty().withMessage('Tienes que escribir una contraseña').bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caracteres').bail()
    .custom(async(confirmPassword, { req }) => {
        console.log('estoy confirmando la password')
        const password = req.body.password;
        if (password !== req.body.password2) {
            console.log('las contraseñas no concuerdan')
            throw new Error('Las contraseñas no coinciden')
        }else{
            console.log('las contraseñas SI concuerdan')
        }
    }),
    body('imagenAvatar').custom((value, { req }) => {
        console.log(req.file)
        console.log('entre al imageAvatar')
        let file = req.file
        let acceptedExtentions = ['.jpg', '.jpeg', '.png']
        if (!file) {
            console.log('estoy viendo si hay archivo')
            throw new Error('Tienes que subir una imágen')
        } else {
            console.log('parece haber file, estoy viendo si la extension sirve')
            let fileExtention = path.extname(file.originalname)
            if (!acceptedExtentions.includes(fileExtention)) {
                throw new Error(`Las extensiones aceptadas son ${acceptedExtentions.join(', ')}`)
            }
        }
        console.log('estoy x tirar return')
        return true
    })


]

module.exports = validations