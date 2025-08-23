const mongoose = require("mongoose")


const renterSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        default:""

    },
    userType: {
        type: Number, // Changed from String to Number
        default: 2    // Assuming 2 = Renter, you can modify as needed
      },
    password:{
        type:String,
        required:true,
        default:""
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

const Renter = mongoose.model.Renter || mongoose.model("Renter",renterSchema)
module.exports = Renter