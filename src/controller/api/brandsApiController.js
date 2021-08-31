const path = require('path');
let db = require('../../database/models');
const sequelize = db.sequelize;
const Brand = db.Brand;


const brandsAPIController = {

    list: (req, res) => {
        Brand.findAll({ attributes:['id', 'name']})
        .then(brands => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: brands.length,
                    url: 'api/brands'
                },
               data: []
            }
            brands.forEach(brand => {
                respuesta.data.push({
                    id: brand.id,
                    name: brand.name,
                })
            });
            return res.json(respuesta);
        })
        .catch( err => {
            res.send({ err: 'Not found' });
        });
    },
    detail: (req, res) =>{
        let brandId = req.params.id;
        Brand.findByPk(brandId, 
            {
            attributes:['name']
            })
            .then(brand => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: brand.length,
                        url: '/api/brands/:id'
                    },
                    data: {
                        brandId : brand.id,
                        name : brand.name
                    }
                }
                res.json(respuesta);
            })
            .catch( err => {
                res.send({ err: 'Not found' });
            });
    },
    
    count: (req, res) =>{
        Brand.findAll()
        .then(brands => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: brands.length,
                    url: 'api/brands/count',
                    text: "El total de brands es " + brands.length
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

module.exports = brandsAPIController;