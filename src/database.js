const mongoose = require('mongoose');
const db = mongoose.connection;
const dotenv = require('dotenv').config();
const URI = dotenv.DB_URI || 'mongodb://localhost/db';

function connect() {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    db.on('open', () => {
        console.log('Database connected');
    })

    db.on('error', error => {
        console.error(error);
    })
}

connect();