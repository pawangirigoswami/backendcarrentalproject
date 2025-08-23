const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true
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
    createdAt:{
        type:Date,
        default:Date.now
    },
    status:{
        type:Boolean,
        default:true
    },
    userType:{
        type:String,
        enum:["admin","renter","hirer"],
        required:true
    },
    otp:{
        type:String,
        default:""
    },
    otpExpiry:{
        type:Date,
        default:""
    }
})

const User = mongoose.models.User || mongoose.model("User",userSchema)
module.exports = User