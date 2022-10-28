// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://hanna050215:skaao2@comp229005midterm301221.gdyvqoi.mongodb.net/test";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}