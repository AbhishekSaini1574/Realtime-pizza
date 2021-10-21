const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authcontroller');

function initRoutes(app){
//home routes  
    app.get('/', homeController().index);

//login route
    app.get('/login', authController().login)

//register route
    app.get('/register',authController().register)

//cart route
    app.get('/cart', cartController().index)

// update-cart
    app.post('/update-cart', cartController().update)

}

module.exports= initRoutes;