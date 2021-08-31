const path = require('path');
const DB = require('../database/models');
const sequelize = DB.sequelize;

let homeController = {

    leerTodos: (req, res) =>{
        DB.Product.findAll()
            .then(products => {
                return res.render(path.resolve(__dirname, '..', 'views',  'index'),{products})
            })


        
    }

}

module.exports = homeController