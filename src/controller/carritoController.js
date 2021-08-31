const path = require('path');
const DB = require('../database/models');
const sequelize = DB.sequelize;
const { Op } = require("sequelize");
const { nextTick } = require('process');

let carritoController = {

    index: async(req, res) => {
        try {
            let products = await DB.Product.findAll();
            return res.render(path.resolve(__dirname, '..', 'views',  'listadoProductos'),{products})
            
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = carritoController