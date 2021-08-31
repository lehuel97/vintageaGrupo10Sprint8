const path = require('path')
const { body } = require('express-validator')
const validations = [
    body('name').notEmpty().withMessage('Este campo no puede estar vacío').bail()
    .isLength({ min: 3 }).withMessage('Nombre demasiado corto'),
    body('image').custom((value, { req }) => {
        let file = req.file
        let acceptedExtentions = ['.jpg', '.jpeg', '.png']
        if (!file) {
            throw new Error('Tienes que subir una imágen')
        } else {
            let fileExtention = path.extname(file.originalname)
            if (!acceptedExtentions.includes(fileExtention)) {
                throw new Error(`Las extensiones aceptadas son ${acceptedExtentions.join(', ')}`)
            }
        }
        return true
    }),
    body('precio').notEmpty().withMessage('Este campo no puede estar vacío').isNumeric(),

]
module.exports = validations