const mongoose = require("mongoose")


const hirerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:""
    },
    email:{
        type:String,
        required:true,
        default:""

    },
    password:{
        type:String,
        required:true,
        default:""
    },
    userType: {
        type: Number, // Changed from String to Number
        default: 3    // Assuming 3 = Hirer, you can modify as needed
      },
    phone:{
        type:String,
        required:true,
        default:""
    },
    address:{
        type:String,
        required:true,
        default:""
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    status:{
        type:Boolean,
        default:true
    }

})

const Hirer = mongoose.model.Hirer || mongoose.model("Hirer",hirerSchema)
module.exports = Hirer