const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');


//Allow Json request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// HTTP request logger middleware
app.use(morgan('dev'));

// Define static files access
app.use(express.static(path.join(__dirname, 'public')));

// Configure routes
app.use('/user', require('./views/user.route'));

module.exports = app;