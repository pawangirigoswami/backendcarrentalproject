const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    hirerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
   
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },
    paymentMode: {
        type: String,
        enum: ["Credit Card", "Debit Card", "UPI", "Net Banking", "Cash"],
        required: true
    },
    accountHolderName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:"Pending"
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
