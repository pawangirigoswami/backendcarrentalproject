const Hirer = require("../user/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerHirer = async (req, res) => {
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

        const existingHirer = await Hirer.findOne({ email });
        if (existingHirer) {
            return res.status(400).json({
                success: false,
                message: "Hirer already exists",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new renter
        const hirer = new Hirer({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            userType
        });

        await hirer.save();
        res.status(201).json({
            success: true,
            message: "New hirer created successfully",
            data: hirer,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};

const loginHirer = async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        if (userType !== "hirer") {
            return res.status(400).json({
                success: false,
                message: "Invalid user type",
            });
        }

        const hirer = await Hirer.findOne({ email });

        if (!hirer || hirer.userType !== "hirer") {
            return res.status(400).json({
                success: false,
                message: "Invalid email or user",
            });
        }

        const isMatch = await bcrypt.compare(password, hirer.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const token = jwt.sign(
            { id: hirer._id, email: hirer.email, userType },
            process.env.SECRET_KEY,
            { expiresIn: "10h" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            hirer,
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


const getAllHirers = async (req, res) => {
    try {
      const hirers = await Hirer.find({ userType: "hirer" }); // Only fetch users where userType is "hirer"
      res.status(200).json({
        success: true,
        message: "All hirers fetched successfully",
        data: hirers,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  };

const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const validation = [];

        if (!userId || typeof userId !== "string") validation.push("user ID is required and must be a string");
        if (!oldPassword || typeof oldPassword !== "string") validation.push("old password is required and must be a string");
        if (!newPassword || typeof newPassword !== "string") validation.push("new password is required and must be a string");

        if (validation.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation
            });
        }

        const user = await Hirer.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Use bcrypt to compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        // Hash new password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedNewPassword;

        await user.save();

        return res.status(201).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};


module.exports = { registerHirer, loginHirer,getAllHirers,changePassword };
