const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authcontroller');
const guest = require('../app/http/middlewares/guest')

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

}

module.exports= initRoutes;