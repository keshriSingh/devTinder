const mongoose = require('mongoose');

async function main() {
    mongoose.connect(process.env.DB_URI);
}

module.exports = main;