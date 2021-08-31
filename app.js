const express = require('express')
const app = express()
const path = require('path');
var port = process.env.PORT || 3001;

const cors = require('cors')

const methodOverride = require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware')
//const adminLoggedMiddleware = require('./src/middlewares/adminLoggedMiddleware')
const cookies = require('cookie-parser')

const homeRouter = require('./src/routes/homeRouter');
const productRouter = require('./src/routes/productRouter');
const carritoRouter = require('./src/routes/carritoRouter');
const userRouter = require('./src/routes/userRouter');
const userApiRouter = require('./src/routes/api/userApiRouter')
const productApiRouter = require('./src/routes/api/productApiRouter')
const categoriesApiRouter = require('./src/routes/api/categoriesApiRouter')
const brandsApiRouter = require('./src/routes/api/brandsApiRouter')

app.set('view engine', 'ejs')
app.use(express.json())
/*app.use(express.static(path.resolve(__dirname, '../public')))*/
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cors())


app.use(session({
    secret: "shuuuuu",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies())
//app.use(adminLoggedMiddleware)
app.use(userLoggedMiddleware)

app.listen(port, function() {
    console.log("Servidor corriendo en el puerto " + port);
});

app.use('/', homeRouter);
app.use('/productos', productRouter);
app.use('/carrito', carritoRouter);
app.use('/users', userRouter);
app.use('/api/v1/user',userApiRouter )
app.use('/api/v1/productos', productApiRouter);
app.use('/api/v1/categories', categoriesApiRouter)
app.use('/api/v1/brands', brandsApiRouter)