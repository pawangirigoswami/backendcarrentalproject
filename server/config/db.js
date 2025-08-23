const mongoose = require('mongoose');
require('dotenv').config()

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected Successfully")

    }
    catch(err){
        console.log('Mongo Connection Failed:',err.message)
        process.exit(1)

    }

}
module.exports = connectDb