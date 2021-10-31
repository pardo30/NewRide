const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

//Allow Json request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Allow cross-origin sharing
app.use(cors());

// HTTP request logger middleware
app.use(morgan('dev'));

// Define static files access
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req,res) => {res.send('Home Page')})

// Configure routes
app.use('/user', require('./views/user.route'));
app.use('/product', require('./views/product.route'));
app.use('/order', require('./views/order.route'));

module.exports = app;