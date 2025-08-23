const Renter = require("../user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerRenter = async (req, res) => {
    try {
        const { name, email, password, phone, address,userType } = req.body;
        console.log(req.body)
        const validation = [];

        if (!name || typeof name !== "string") {
            validation.push("Name is required and must be a string");
        }
        if (!email || typeof email !== "string") {
            validation.push("Email is required and must be a string");
        }
        if (!password || typeof password !== "string") {
            validation.push("Password is required and must be a string");
        }
        if (!phone || typeof phone !== "string") {
            validation.push("Phone number is required and must be a string");
        }
        if (!address || typeof address !== "string") {
            validation.push("Address is required and must be a string");
        }
        if(!userType || typeof userType !== "string"){
            validation.push("User type is required and mustbe a string")
        }
        if(!["admin","renter","hirer"].includes(userType)){
            validation.push("invalid user type")
        }

        if (validation.length > 0) {
            return res.status(422).json({
                success: false,
                message: "Validation error",
                errors: validation,
            });
        }

        const existingRenter = await Renter.findOne({ email });
        if (existingRenter) {
            return res.status(400).json({
                success: false,
                message: "Renter already exists",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new renter
        const renter = new Renter({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            userType
            
        });

        await renter.save();
        res.status(201).json({
            success: true,
            message: "New renter created successfully",
            data: renter,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

const loginRenter = async (req, res) => {
    const {email,password,userType} = req.body
   try{
       if(userType !== "renter"){
        return res.json({
            status:400,
            success:false,
            message:"Invalid User Type"
        })
       }

       const renter = await Renter.findOne({email})
       if(!renter || renter.userType !== "renter"){
        return res.json({
            status:400,
            success:false,
            message:"internal server error"
        })
       }
       const isMatch = await bcrypt.compare(password, renter.password);
       if (!isMatch) {
           return res.status(401).json({
               success: false,
               message: "Incorrect password",
           });
       }

       const token = jwt.sign(
           { id: renter._id, email: renter.email, userType },
           process.env.SECRET_KEY,
           { expiresIn: "10h" }
       );

       return res.status(200).json({
           success: true,
           message: "Login successful",
           token,
           renter,
           userType,
       });

   } catch (err) {
       return res.status(500).json({
           success: false,
           message: "Internal server error",
           error: err.message,
       });
   }
};


const getAllRenter = async(req,res) =>{
    try{
        const renter = await Renter.find({userType:"renter"})
        res.json({
            status:200,
            success:true,
            message:"all renter is fetch successfully",
            renter
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

module.exports = { registerRenter, loginRenter,getAllRenter };
