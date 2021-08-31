const path = require('path');
let db = require('../../database/models');
const sequelize = db.sequelize;
const User = db.User;
const Rol = db.Rol;
const pagination = require('./paginationApiUsers')

const usersAPIController = {

    list: (req, res) => {
        if ( !req.query.query ) {
            let users = User.findAll({ attributes:['id', 'firstName','email']})
            .then(users => {
                let response = {
                    meta: {
                        status : 200,
                        total: users.length,
                        url: 'api/v1/users'
                    },
                   data: {
                    list: []
                }
                }
                users.forEach(user => {
                    response.data.list.push({
                        id: user.id,
                        firstName: user.firstName,
                        email: user.email,
                        detail: `/api/v1/users/${user.id}`
                    })
                    return user
                });
                return res.json(response);
            })
            .catch( err => {
                res.send({ err: 'Not found' });
            });
        } else {
            pagination(req, res);
        }
    },
    detail: (req, res) =>{
        let userId = req.params.id;
        User.findByPk(userId, 
            {
            attributes:['firstName', 'email', 'profilePicture']
            })
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user.length,
                        url: '/api/v1/users/:id'
                    },
                    data: {
                        userId : user.id,
                        firstName : user.firstName,
                        email : user.email,
                        profilePicture : req.headers.host + '/avatars/' + user.profilePicture
                    }
                }
                res.json(respuesta);
            })
            .catch( err => {
                res.send({ err: 'Not found' });
            });
    },
    count: (req, res) =>{
        User.findAll()
        .then(users => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users/count',
                    text: "El total de users es " + users.length
                },
                data: {}
            }
         res.json(respuesta);
        })
        .catch( err => {
            res.send({ err: 'Not found' });
        });
    }
}

module.exports = usersAPIController;