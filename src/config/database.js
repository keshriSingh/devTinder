const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    mongoose.connect(process.env.DB_URI);
}

module.exports = main;