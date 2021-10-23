const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authcontroller');
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController');

//Middlewares
const auth = require('../app/http/middlewares/auth')
const guest = require('../app/http/middlewares/guest')
const admin = require('../app/http/middlewares/admin');



function initRoutes(app){
//home routes  
    app.get('/', homeController().index);

//login route
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)


//register route
    app.get('/register', guest, authController().register)
    app.post('/register',authController().postRegister)

//cart route
    app.get('/cart', cartController().index)

// update-cart
    app.post('/update-cart', cartController().update)

// Customer Routes 
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)

// Admin routes
    app.get('/admin/orders', admin, AdminOrderController().index)

}

module.exports= initRoutes;