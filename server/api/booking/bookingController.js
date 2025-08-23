const Booking = require("./bookingModel")
const User = require("../user/userModel")
const Brand = require("../brand/brandModel")
const Car = require("../car/carModel")

const mongoose = require('mongoose');

const createBooking = async (req, res) => {
  const {
    hirerId,
    brandId,
    carId,
    paymentMode,
    accountHolderName,
    accountNumber,
    cvv
  } = req.body;

  // Validate required fields
  if (!hirerId || !brandId || !carId || !paymentMode || !accountHolderName || !accountNumber || !cvv) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const booking = new Booking({
      hirerId,
      brandId,
      carId,
      paymentMode,
      accountHolderName,
      accountNumber,
      cvv,
    });

    await booking.save();
    res.status(200).json({ success: true, message: 'Booking created successfully!' });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ success: false, message: 'Server error. Could not create booking.' });
  }
};



// get all booking 

const  getAllBooking = async(req,res) =>{
    try{
        const booking = await Booking.find()
        .populate({path:"hirerId",select:"name"})
        .populate({path:"brandId",select:"name description"})
        .populate({path:"carId",select:"name"})

        console.log(JSON.stringify(booking, null, 2));
    

        res.json({
            status:200,
            success:true,
            message:"all booking retrieved successfully",
            data:booking
        })

    }catch(err){
       res.json({
        status:500,
        success:false,
        message:"internal server error",
        error:err.message
       })
    }
}

// get booking by id 


const getBookingById = async(req,res) =>{
    try{
        const {id} = req.body;
        if(!id){
            return res.json({
                 status:400,
                 success:false,
                 message:"Booking ID is required"
            })
        }

        const booking = await Booking.findById(id)
        .populate("hirerId","name email")
        .populate("brandId","name description")
        .populate("carId","name image")

        if(!booking){
            return res.json({
                status:404,
                success:false,
                message:"booking not found"
            })
        }

        res.json({
            status:200,
            success:true,
            data:booking
        })

    }catch(err){
       res.json({
        status:500,
        success:false,
        message:"internal server error",
        error:err.message
       })
    }
}

// delete a booking 

const deleteBooking = async(req,res) =>{
    try{

        const {id} = req.body ;
        if(!id){
            return res.json({
                status:404,
                success:false,
                message:"Booking Id is Required"
            })
        }

        const deleteBooking = await Booking.findByIdAndDelete(id)
        if(!deleteBooking){
            return res.json({
                status:400,
                success:false,
                message:"Booking is not found"
            })
        }

        res.json({
            status:200,
            success:true,
            message:"Booking delete successfully",

        })

    }catch(err){
         res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
         })
    }
}


const updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;

  if (!bookingId || !status) {
    return res.json({
      status: 400,
      success: false,
      message: "Booking ID and status are required"
    });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.json({
        status: 404,
        success: false,
        message: "Booking not found"
      });
    }

    res.json({  // fixed typo here
      status: 200,
      success: true,
      message: "Status updated",
      booking: updatedBooking
    });
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};


module.exports = {createBooking,getAllBooking,getBookingById,deleteBooking,updateBookingStatus}

