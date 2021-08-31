const { Product, Brand, Category, Color, Size} = require('../../database/models');
const { Op } = require("sequelize");

module.exports = (req, res) => {
    let query = JSON.parse(req.query.query);

    let response = {
        meta: {
            status: 500,
            msg: 'ERROR',
            count: 0,
            totalPages: 0,
            next: null,
            prev: null,
            query: {
                page: parseInt(query.page) || 1,
                perPage: parseInt(query.perPage) || 10,
                name: query.name || '',
                description: query.description || '',
                url: `/api/v1/productos/?query=${JSON.stringify(query)}`
            }
        },
        data: {
            list: [
                {
                    id: null,
                    name: '',
                    description: '',
                    price: null,
                    category: null,
                    url: '',
                },
            ]
        }
    };

    let offset = (response.meta.query.page -1) * response.meta.query.perPage;

    Product.findAndCountAll({ 
        where: { 
            name: { [Op.substring]: response.meta.query.name }, 
            description: { [Op.substring]: response.meta.query.description }, 
        },
        order: [ 
            ['id', 'ASC'], 
        ],
        limit: response.meta.query.perPage,
        offset,
        distinct: true,
        include: [
            "brand", "category", "color", "size"
         ]
    })
    .then( result => JSON.parse(JSON.stringify(result)) )
    .then( result => {
        if (result.rows.length) {
            response.meta.status = 200;
            response.meta.msg = 'Listado de productos paginado obtenido exitosamente';
            response.meta.count = result.count;
            response.meta.totalPages = Math.ceil(response.meta.count / response.meta.query.perPage);

            let currentPage = response.meta.query;
            if ( currentPage.page < response.meta.totalPages ) {
                response.meta.next = {
                    page: currentPage.page + 1,
                    perPage: currentPage.perPage,
                    name: currentPage.name,
                    description: currentPage.description,
                };
                response.meta.next.url = `/api/v1/productos/?query=${JSON.stringify(response.meta.next)}`;
            }
            
            if ( currentPage.page > 1 ) {
                response.meta.prev = {
                    page: currentPage.page - 1,
                    perPage: currentPage.perPage,
                    name: currentPage.name,
                    description: currentPage.description,
                };
                response.meta.prev.url = `/api/v1/productos/?query=${JSON.stringify(response.meta.prev)}`;
            }

            response.data.list = result.rows.map(row => {
                let product = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    price: row.price,
                    category: row.category.name,
                    url: `/api/v1/productos/${row.id}`   
                }
                return product
            });
    
            return res.json(response)
        }

        response.meta.status = 404;
        response.meta.msg = 'Not found';
        res.status(404).json(response)

    })
    .catch( err => {
        console.log(err);
        res.status(500).json(response)
    });
}
