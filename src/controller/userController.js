const bcryptjs = require('bcryptjs')
const path = require('path');
const { validationResult } = require('express-validator')
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

let userController = {
    register: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'registro'));
    },

    processRegister: async(req, res) => {
        try {
            
            const resultValidation = validationResult(req)
            if (resultValidation.errors.length > 0) {
                return res.render(path.resolve(__dirname, '..', 'views', 'registro'),{
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            console.log(req.body)
            let userInDB = await db.User.findOne({
                where: { email: req.body.correo }
            })

            if (userInDB) {
                return res.render(path.resolve(__dirname, '..', 'views', 'registro'),{
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                })
            }

            if(req.file.filename){
                const imageProfile = req.file.filename
            }else{
                const imageProfile = "index.png"
            }
            let userToCreate = {
                firstName: req.body.nombre,
                email: req.body.correo,
                password: bcryptjs.hashSync(req.body.password, 10),
                profilePicture: imageProfile,
                isAdmin: 0
            }
            console.log(`USUARIO POR CREARSE:`, { userToCreate });

            let userCreated = await db.User.create(userToCreate);
            console.log(`USUARIO CREADO:`, { userCreated })

            return res.redirect('/inicio-sesion');
        } catch (error) { console.log(error) }
    },

    login: (req, res) => {
        res.render(path.resolve(__dirname, '..', 'views', 'inicio-sesion'));
    },
    perfil: (req,res) =>{
        let user = req.session.userLogged
    console.log('aca se viene el user ')
    console.log(user)
    res.render(path.resolve(__dirname, '..', 'views', 'profile'),{user})
    },
    loginProcess: async(req, res) => {
        try {
            let userToLog = await db.User.findOne({ where: { email: req.body.correo } })

            if (userToLog) {
                let passValidation = bcryptjs.compareSync(req.body.password, userToLog.password)
                if (passValidation) {
                    delete userToLog.password
                    req.session.userLogged = userToLog
                    //console.log(req.session.userLogged)
                    res.locals.userLogged = req.session.userLogged

                    if (req.body.recordame) {
                        res.cookie('email', req.body.correo, { maxAge: (1000 * 60) * 2 })
                    }
                    return res.redirect('/users/profile')
                }
                return res.render(path.resolve(__dirname, '..', 'views', 'inicio-sesion'), {
                    errors: {
                        email: {
                            msg: 'Credenciales inválidas'
                        }
                    }
                });
            }

            return res.render(path.resolve(__dirname, '..', 'views', 'inicio-sesion'), {
                errors: {
                    email: {
                        msg: 'No estás registrado'
                    }
                }
            });

        } catch (error) {
            console.log(error);
        }
    },

    edit: async(req, res) => {
        try {
            let user = await db.User.findByPk(req.params.id);
            console.log(user);
            res.render("userEdit", { user });
        } catch (error) {
            res.render('error404');
            console.log(error);
        }
    },
    update: async(req, res) => {
        try {
            let userUpdated = await db.User.update({
                ...req.body,
                name: req.body.name,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                address: req.body.address,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: req.file.filename
            }, {
                where: {
                    id: req.params.id
                }
            })

            return res.redirect('/profile');
        } catch (error) {
            console.log(error);
        }
    },

    logout: (req, res) => {
        res.clearCookie('email')
        req.session.destroy()
        console.log('ACA ESTA EL SESSIONNNN '+ req.session)
        res.locals.userLogged = false
        console.log('este es el LOGOUTTTTTTT '  + res.locals.userLogged)
        return res.redirect('/')
    }
}

module.exports = userController