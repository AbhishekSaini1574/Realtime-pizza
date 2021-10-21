require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');

//Database connection
const url = 'mongodb+srv://root:root@cluster0.jaxeb.mongodb.net/pizza?retryWrites=true&w=majority' ;

mongoose.connect(url, { useNewUrlParser:true, useUnifiedTopology:true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database Connected...');
})



//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: 'mongodb+srv://root:root@cluster0.jaxeb.mongodb.net/pizza?retryWrites=true&w=majority'
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }               //24 hours
}))

//using flash for message
app.use(flash())

//Assets
app.use(express.static('public'));
app.use(express.json());

// global middleware
app.use((req ,res ,next)=>{
    res.locals.session = req.session
    next()
})

//set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

require('./routes/web')(app);                          //call function (initial routes from web.js)


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})