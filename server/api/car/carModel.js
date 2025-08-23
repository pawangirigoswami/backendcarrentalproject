const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    
brandId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Brand",
      required:true
    },
    image:{
        type:String, // this will hold the file path or url
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    price:{
        type:Number,
        required:true
    }    

})

const Car = mongoose.models.Car || mongoose.model("Car",carSchema)
module.exports = Car