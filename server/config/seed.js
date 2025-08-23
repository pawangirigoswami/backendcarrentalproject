const Admin = require("../api/user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const admin = async (req, res) => {
    try {
        const adminData = await Admin.findOne({ email: "admin@gmail.com" });

        if (!adminData) {
            const hashedPassword = await bcrypt.hash("123456", 10);
            const adminObj = new Admin({
                name: "admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                userType: "admin",
                phone:"7497060299",
                address:"pundri" 
            });
            await adminObj.save();
            console.log("Admin created successfully");

           
        } 
            console.log("Admin already exists");

           
    } catch (err) {
        console.error("Error creating admin:", err);

       
    }
};

const adminLogin = async (req, res) => {
    const { email, password, userType } = req.body;

    try{
        if(userType !== "admin"){
            return res.json({
                success:false,
                message:"Access denied, not an admin user"
            })
        }
        const admin = await Admin.findOne({email})

        if(!admin || admin.userType !== "admin"){
            return res.json({
                success:false,
                message:"invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { id: admin._id, email: admin.email, userType: admin.userType },
            process.env.SECRET_KEY,
            { expiresIn: "10h" }
        );

        return res.status(200).json({
            success: true,
            token,
            admin,
            userType,
            message: "Login successful"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

   

module.exports = { admin, adminLogin };
