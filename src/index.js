const app = require('./app');
require('./database');
const dotenv = require('dotenv').config();
const PORT = dotenv.PORT || 3000;


async function init() {
    await app.listen(PORT, () => {
    console.log('App running on port: ', PORT)})
}

init();