const express = require('express');
//const expressLayouts = require('express-ejs-layouts')
const todoController = require('./controllers/todoController');
const mongoose = require('mongoose');
const flash = require('connect-flash')
const session = require('express-session')
const app = express();
const passport = require('passport')

//passport comfig
require('./config/passport')(passport)

const port = process.env.PORT || 8005

const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to mongodb')
);

//app.use(expressLayouts)
//ejs template engine
app.set('view engine', 'ejs');

//body parser
app.use(express.urlencoded({ extended: false }));
//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//routes
app.use('/', require('./controllers/index'))
app.use('/users', require('./controllers/users'))
app.use('/', require('./controllers/todoController'))

app.use(express.static('./public'))


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})