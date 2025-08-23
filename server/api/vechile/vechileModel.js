const mongoose = require("mongoose");

const vechileSchema = new mongoose.Schema({
    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Car", // reference the car model 
        required:true

    },
    rent:{
        type:Number,
        required:true,

    },
    description:{
        type:String,
        required:true
    }
})

const Vechile = mongoose.model.Vechile || mongoose.model("Vechile",vechileSchema)

module.exports = Vechile