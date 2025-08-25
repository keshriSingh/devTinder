const mongoose = require('mongoose')

async function main() {
    mongoose.connect('mongodb+srv://Keshri_Singh:keshri52@cluster0.wzw2rah.mongodb.net/devTinder');
}

module.exports = main;