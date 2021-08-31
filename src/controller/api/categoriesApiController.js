const path = require('path');
let db = require('../../database/models');
const sequelize = db.sequelize;
const Category = db.Category;


const categoriesAPIController = {

    list: (req, res) => {
        Category.findAll({ attributes:['id', 'name']})
        .then(categories => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: categories.length,
                    url: 'api/categories'
                },
               data: []
            }
            categories.forEach(category => {
                respuesta.data.push({
                    id: category.id,
                    name: category.name,
                })
            });
            return res.json(respuesta);
        })
        .catch( err => {
            res.send({ err: 'Not found' });
        });
    },
    detail: (req, res) =>{
        let categoryId = req.params.id;
        Category.findByPk(categoryId, 
            {
            attributes:['name']
            })
            .then(category => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: category.length,
                        url: '/api/categories/:id'
                    },
                    data: {
                        categoryId : category.id,
                        name : category.name
                    }
                }
                res.json(respuesta);
            })
            .catch( err => {
                res.send({ err: 'Not found' });
            });
    },
    
    count: (req, res) =>{
        Category.findAll()
        .then(categories => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: categories.length,
                    url: 'api/categories/count',
                    text: "El total de categorias es " + categories.length
                },
                data: {categories}
            }
         res.json(respuesta);
        })
        .catch( err => {
            res.send({ err: 'Not found' });
        });
    }
}

module.exports = categoriesAPIController;